import type { HREdge, HRNode } from '../types'

type Serialized = {
  workflowTitle: string
  nodes: HRNode[]
  edges: HREdge[]
}

export function serialize(workflowTitle: string, nodes: HRNode[], edges: HREdge[]): string {
  const payload: Serialized = { workflowTitle, nodes, edges }
  return JSON.stringify(payload, null, 2)
}

export function deserialize(json: string): Serialized {
  const parsed = JSON.parse(json) as Partial<Serialized>
  if (!parsed || typeof parsed !== 'object') throw new Error('Invalid workflow JSON')
  if (typeof parsed.workflowTitle !== 'string') throw new Error('Invalid workflowTitle')
  if (!Array.isArray(parsed.nodes) || !Array.isArray(parsed.edges)) throw new Error('Invalid nodes/edges')
  return { workflowTitle: parsed.workflowTitle, nodes: parsed.nodes as HRNode[], edges: parsed.edges as HREdge[] }
}

export function exportWorkflowToJson(input: Serialized): string {
  return serialize(input.workflowTitle, input.nodes, input.edges)
}

export function importWorkflowFromJson(json: string): Serialized {
  return deserialize(json)
}

