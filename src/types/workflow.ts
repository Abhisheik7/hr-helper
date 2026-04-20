import type { HREdge, HRNode } from './nodes'

export type WorkflowStatus = 'idle' | 'validating' | 'simulating' | 'done' | 'error'

export type ValidationError = {
  nodeId?: string
  message: string
  type: 'error' | 'warning'
}

export type ValidationResult = {
  valid: boolean
  errors: ValidationError[]
}

export type SimulationStep = {
  stepNumber: number
  nodeId: string
  nodeType: string
  nodeTitle: string
  status: 'completed' | 'failed'
  duration: string
  message: string
  timestamp: string
}

export type SimulationResult = {
  success: boolean
  executionId: string
  totalSteps: number
  steps: SimulationStep[]
}

export type WorkflowTemplate = {
  id: string
  name: string
  description: string
  icon: string
  nodes: HRNode[]
  edges: HREdge[]
}

