import type { HREdge, HRNode, ValidationResult } from '../types'
import { NodeType } from '../types'

export function hasStartNode(nodes: HRNode[]): boolean {
  return nodes.some((n) => n.data.type === NodeType.START)
}

export function hasEndNode(nodes: HRNode[]): boolean {
  return nodes.some((n) => n.data.type === NodeType.END)
}

export function allNodesConnected(nodes: HRNode[], edges: HREdge[]): boolean {
  if (nodes.length === 0) return false
  const connected = new Set<string>()
  edges.forEach((e) => {
    connected.add(e.source)
    connected.add(e.target)
  })
  return nodes.every((n) => connected.has(n.id))
}

export function detectCycles(nodes: HRNode[], edges: HREdge[]): boolean {
  const ids = new Set(nodes.map((n) => n.id))
  const adj = new Map<string, string[]>()
  nodes.forEach((n) => adj.set(n.id, []))
  edges.forEach((e) => {
    if (!ids.has(e.source) || !ids.has(e.target)) return
    adj.get(e.source)?.push(e.target)
  })

  const visiting = new Set<string>()
  const visited = new Set<string>()

  const dfs = (id: string): boolean => {
    if (visiting.has(id)) return true
    if (visited.has(id)) return false
    visiting.add(id)
    for (const nxt of adj.get(id) ?? []) {
      if (dfs(nxt)) return true
    }
    visiting.delete(id)
    visited.add(id)
    return false
  }

  for (const id of adj.keys()) {
    if (dfs(id)) return true
  }
  return false
}

export function validateWorkflow(nodes: HRNode[], edges: HREdge[]): ValidationResult {
  const errors: ValidationResult['errors'] = []
  if (!hasStartNode(nodes)) errors.push({ message: 'Start node present', type: 'error' })
  if (!hasEndNode(nodes)) errors.push({ message: 'End node present', type: 'error' })
  if (!allNodesConnected(nodes, edges)) errors.push({ message: 'All nodes connected', type: 'error' })
  if (detectCycles(nodes, edges)) errors.push({ message: 'Cycle detected', type: 'error' })
  return { valid: errors.length === 0, errors }
}

