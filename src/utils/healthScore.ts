import type { HREdge, HRNode } from '../types'
import { allNodesConnected, detectCycles, hasEndNode, hasStartNode } from './graphValidation'

export function computeHealthScore(nodes: HRNode[], edges: HREdge[]): number {
  let score = 0
  if (hasStartNode(nodes)) score += 25
  if (hasEndNode(nodes)) score += 25
  if (allNodesConnected(nodes, edges)) score += 25
  if (!detectCycles(nodes, edges)) score += 25
  return score
}

