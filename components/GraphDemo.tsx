"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Network } from "vis-network/standalone"
import type { Data, Edge, Node, Options } from "vis-network/standalone"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

type GraphNode = {
  id: string
  label: string
  kind: "lo" | "concept" | "example" | "exercise"
  loId?: string
  contentId?: string
  unit?: string
  chapter?: string
  book?: string
}

type GraphEdge = {
  id: string
  from: string
  to: string
  relation: "prerequisite" | "explained_by" | string
  score?: number
}

type GraphPayload = {
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

const kindColor: Record<GraphNode["kind"], string> = {
  lo: "hsl(var(--primary))",
  concept: "hsl(var(--secondary))",
  example: "hsl(var(--chart-3))",
  exercise: "hsl(var(--chart-5))",
}

export default function GraphDemo() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const networkRef = useRef<Network | null>(null)
  const [data, setData] = useState<GraphPayload | null>(null)
  const [query, setQuery] = useState("")
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    let canceled = false
    ;(async () => {
      const res = await fetch("/api/graph")
      const json = (await res.json()) as GraphPayload
      if (!canceled) setData(json)
    })()
    return () => {
      canceled = true
    }
  }, [])

  const visData = useMemo((): Data | null => {
    if (!data) return null
    const nodes: Node[] = data.nodes.map((n) => ({
      id: n.id,
      label: n.label,
      shape: "dot",
      size: n.kind === "lo" ? 14 : 10,
      color: {
        background: kindColor[n.kind],
        border: "hsl(var(--border))",
        highlight: { background: kindColor[n.kind], border: "hsl(var(--ring))" },
      },
      font: { color: "hsl(var(--foreground))", size: 12 },
      title: n.label,
    }))

    const edges: Edge[] = data.edges.map((e) => ({
      id: e.id,
      from: e.from,
      to: e.to,
      color: e.relation === "prerequisite" ? "hsl(var(--border))" : "hsl(var(--secondary))",
      arrows: {
        to: { enabled: true, scaleFactor: 0.6 },
      },
      dashes: e.relation === "explained_by",
      width: e.score ? Math.max(1, Math.round(e.score * 3)) : 1,
    }))

    return { nodes, edges }
  }, [data])

  const options: Options = useMemo(
    () => ({
      autoResize: true,
      physics: {
        enabled: true,
        solver: "forceAtlas2Based",
        stabilization: { iterations: 200, updateInterval: 25 },
      },
      interaction: {
        hover: true,
        multiselect: false,
        zoomView: true,
        navigationButtons: false,
        tooltipDelay: 100,
      },
      nodes: { borderWidth: 1, shadow: false },
      edges: { smooth: { type: "continuous", roundness: 0.3 } },
    }),
    []
  )

  // Initialize / update network
  useEffect(() => {
    if (!containerRef.current) return
    if (!visData) return
    if (networkRef.current) {
      networkRef.current.setData(visData)
      return
    }
    const network = new Network(containerRef.current, visData, options)
    networkRef.current = network
    network.on("click", (params) => {
      const id = (params.nodes?.[0] as string | undefined) || null
      setSelectedId(id)
      if (id) {
        network.selectNodes([id])
        network.focus(id, { scale: 1.2, animation: { duration: 400, easingFunction: "easeInOutQuad" } })
      } else {
        network.unselectAll()
      }
    })
  }, [visData, options])

  // Filtering by query
  const applyFilter = useCallback(() => {
    if (!networkRef.current || !visData) return
    const ds: any = networkRef.current.body?.data?.nodes
    if (!ds) return
    const queryLower = query.trim().toLowerCase()
    const updates: any[] = []
    ds.forEach((item: any) => {
      const label = String(item.label || "")
      const matches = !queryLower || label.toLowerCase().includes(queryLower)
      updates.push({ id: item.id, hidden: queryLower ? !matches : false })
    })
    ds.update(updates)
  }, [query, visData])

  useEffect(() => {
    applyFilter()
  }, [applyFilter])

  const selectedNode = useMemo(() => data?.nodes.find((n) => n.id === selectedId) || null, [data, selectedId])

  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading graph…</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={40} />
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Interactive Knowledge Graph</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2 items-center">
            <Input
              placeholder="Search nodes…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="max-w-sm"
            />
            <Button size="sm" onClick={applyFilter}>Filter</Button>
          </div>
          <div ref={containerRef} className="h-[560px] rounded-lg border bg-muted/20" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Node Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {selectedNode ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge>{selectedNode.kind}</Badge>
              </div>
              <div className="font-semibold">{selectedNode.label}</div>
              <div className="text-sm text-muted-foreground">
                {selectedNode.unit ? <div>Unit: {selectedNode.unit}</div> : null}
                {selectedNode.chapter ? <div>Chapter: {selectedNode.chapter}</div> : null}
                {selectedNode.book ? <div>Book: {selectedNode.book}</div> : null}
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">Click a node to view details.</div>
          )}

          <div className="pt-4">
            <div className="text-xs text-muted-foreground">Graph Stats</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><span className="text-muted-foreground">LOs:</span> {data.stats.numLearningObjectives}</div>
              <div><span className="text-muted-foreground">Content:</span> {data.stats.numContentItems}</div>
              <div><span className="text-muted-foreground">Prereq Edges:</span> {data.stats.numEdgesPrereq}</div>
              <div><span className="text-muted-foreground">Content Edges:</span> {data.stats.numEdgesContent}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


