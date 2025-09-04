import { NextResponse } from 'next/server'
import path from 'node:path'
import { promises as fs } from 'node:fs'
import Papa from 'papaparse'
import * as Sentry from '@sentry/nextjs'

type LearningObjectiveRow = {
  lo_id: string
  learning_objective: string
  unit?: string
  chapter?: string
  book?: string
}

type ContentItemRow = {
  content_id: string
  content_type: 'concept' | 'example' | 'exercise' | string
  lo_id_parent?: string
  text?: string
  image_urls?: string
  book?: string
  learning_objective?: string
  unit?: string
  chapter?: string
}

type PrereqEdgeRow = {
  source_lo_id: string
  target_lo_id: string
  relation: string
  score?: string
  rationale?: string
}

type ContentEdgeRow = {
  source_lo_id: string
  target_content_id: string
  relation: string
  score?: string
  rationale?: string
}

export type GraphNode = {
  id: string
  label: string
  kind: 'lo' | 'concept' | 'example' | 'exercise'
  loId?: string
  contentId?: string
  unit?: string
  chapter?: string
  book?: string
}

export type GraphEdge = {
  id: string
  from: string
  to: string
  relation: 'prerequisite' | 'explained_by' | string
  score?: number
}

export type GraphPayload = {
  nodes: GraphNode[]
  edges: GraphEdge[]
  stats: {
    numLearningObjectives: number
    numContentItems: number
    numEdgesPrereq: number
    numEdgesContent: number
    totalNodes: number
    totalEdges: number
  }
}

let cached: GraphPayload | null = null

export const runtime = 'nodejs'

async function parseCsv<T extends Record<string, string>>(filePath: string): Promise<T[]> {
  const csvText = await fs.readFile(filePath, 'utf8')
  const result = Papa.parse<T>(csvText, { header: true, skipEmptyLines: 'greedy' })
  if (result.errors && result.errors.length) {
    // In a real app we would log details; for demo we proceed with valid rows
  }
  return (result.data || []).filter(Boolean)
}

export async function GET() {
  try {
    if (cached) {
      return NextResponse.json(cached)
    }

    const dataDir = path.join(process.cwd(), 'demo')
    const loIndexPath = path.join(dataDir, 'lo_index.csv')
    const contentItemsPath = path.join(dataDir, 'content_items.csv')
    const edgesPrereqsPath = path.join(dataDir, 'edges_prereqs.csv')
    const edgesContentPath = path.join(dataDir, 'edges_content.csv')

    const [loRows, contentRows, prereqRows, contentEdgeRows] = await Promise.all([
      parseCsv<LearningObjectiveRow>(loIndexPath),
      parseCsv<ContentItemRow>(contentItemsPath),
      parseCsv<PrereqEdgeRow>(edgesPrereqsPath),
      parseCsv<ContentEdgeRow>(edgesContentPath),
    ])

    const loIdToNode: Map<string, GraphNode> = new Map()
    const nodes: GraphNode[] = []
    const pushNode = (node: GraphNode) => {
      if (!nodes.find((n) => n.id === node.id)) nodes.push(node)
    }

    for (const row of loRows) {
      const id = `lo_${row.lo_id}`
      const node: GraphNode = {
        id,
        label: row.learning_objective,
        kind: 'lo',
        loId: row.lo_id,
        unit: row.unit,
        chapter: row.chapter,
        book: row.book,
      }
      pushNode(node)
      loIdToNode.set(row.lo_id, node)
    }

    const contentIdToNode: Map<string, GraphNode> = new Map()
    for (const row of contentRows) {
      const id = row.content_id
      const kind = (row.content_type as GraphNode['kind']) || 'concept'
      const labelSource = row.learning_objective || row.content_id
      const node: GraphNode = {
        id,
        label: labelSource,
        kind: ['concept', 'example', 'exercise'].includes(kind)
          ? (kind as GraphNode['kind'])
          : 'concept',
        contentId: row.content_id,
        loId: row.lo_id_parent,
        unit: row.unit,
        chapter: row.chapter,
        book: row.book,
      }
      pushNode(node)
      contentIdToNode.set(row.content_id, node)
    }

    const edges: GraphEdge[] = []
    for (const row of prereqRows) {
      const from = `lo_${row.source_lo_id}`
      const to = `lo_${row.target_lo_id}`
      const score = row.score ? Number(row.score) : undefined
      edges.push({
        id: `pr_${from}_${to}`,
        from,
        to,
        relation: row.relation || 'prerequisite',
        score,
      })
    }

    for (const row of contentEdgeRows) {
      const from = `lo_${row.source_lo_id}`
      const to = row.target_content_id
      const score = row.score ? Number(row.score) : undefined
      edges.push({
        id: `ex_${from}_${to}`,
        from,
        to,
        relation: row.relation || 'explained_by',
        score,
      })
    }

    const payload: GraphPayload = {
      nodes,
      edges,
      stats: {
        numLearningObjectives: loRows.length,
        numContentItems: contentRows.length,
        numEdgesPrereq: prereqRows.length,
        numEdgesContent: contentEdgeRows.length,
        totalNodes: nodes.length,
        totalEdges: edges.length,
      },
    }

    cached = payload
    return NextResponse.json(payload)
  } catch (err) {
    Sentry.captureException(err)
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}


