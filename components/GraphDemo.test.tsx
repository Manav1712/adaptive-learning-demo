import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import GraphDemo from './GraphDemo'

vi.mock('vis-network/standalone', () => {
  class NetworkMock {
    constructor(_: any, __: any, ___: any) {}
    setData() {}
    on() {}
    selectNodes() {}
    focus() {}
    unselectAll() {}
    get body() { return { data: { nodes: { forEach: () => {}, update: () => {} } }, nodes: {} } }
  }
  return { Network: NetworkMock }
})

describe('GraphDemo', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(async () => ({
      json: async () => ({
        nodes: [
          { id: 'lo_1', label: 'A', kind: 'lo' },
          { id: 'c_1', label: 'Concept', kind: 'concept' },
        ],
        edges: [
          { id: 'e1', from: 'lo_1', to: 'c_1', relation: 'explained_by', score: 1 },
        ],
        stats: { numLearningObjectives: 1, numContentItems: 1, numEdgesPrereq: 0, numEdgesContent: 1, totalNodes: 2, totalEdges: 1 }
      })
    })) as any)
  })

  it('renders loading state then graph UI', async () => {
    render(<GraphDemo />)
    expect(await screen.findByText(/Loading graph/i)).toBeInTheDocument()
    await waitFor(() => expect(screen.getByText(/Interactive Knowledge Graph/i)).toBeInTheDocument())
    expect(screen.getByPlaceholderText(/Search nodes/i)).toBeInTheDocument()
  })
})



