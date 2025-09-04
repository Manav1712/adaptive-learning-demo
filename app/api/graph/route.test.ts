import { describe, it, expect } from 'vitest'
import { GET } from './route'

describe('GET /api/graph', () => {
  it('returns nodes, edges, and stats', async () => {
    const res = await GET()
    const json = await res.json()

    expect(json).toBeTruthy()
    expect(Array.isArray(json.nodes)).toBe(true)
    expect(Array.isArray(json.edges)).toBe(true)
    expect(typeof json.stats).toBe('object')
    expect(json.stats.totalNodes).toBeGreaterThan(0)
    expect(json.stats.totalEdges).toBeGreaterThan(0)
  })
})



