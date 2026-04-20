import type { Automation, HREdge, HRNode } from './nodes'
import type { SimulationResult } from './workflow'

export type AutomationsResponse = Automation[]

export type SimulateRequest = {
  nodes: HRNode[]
  edges: HREdge[]
  workflowTitle: string
}

export type SimulateResponse = SimulationResult

