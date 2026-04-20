import type { Edge, Node } from '@xyflow/react'

export enum NodeType {
  START = 'START',
  TASK = 'TASK',
  APPROVAL = 'APPROVAL',
  AUTOMATED = 'AUTOMATED',
  END = 'END',
}

export type MetadataEntry = { id: string; key: string; value: string }
export type CustomField = { id: string; key: string; value: string }
export type Tag = { id: string; label: string }

export type AutomationParam = {
  key: string
  label: string
  type: 'text' | 'email' | 'number'
}

export type Automation = {
  id: string
  label: string
  icon: string
  params: AutomationParam[]
}

export type StartNodeData = {
  type: NodeType.START
  title: string
  triggerDescription: string
  metadata: MetadataEntry[]
}

export type TaskNodeData = {
  type: NodeType.TASK
  title: string
  description: string
  assignee: string
  dueDate: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  customFields: CustomField[]
}

export type ApprovalNodeData = {
  type: NodeType.APPROVAL
  title: string
  approverRole: 'Manager' | 'HRBP' | 'Director' | 'C-Suite'
  autoApproveAfterDays: number
  requireComment: boolean
  escalationPath: string
}

export type AutomatedStepNodeData = {
  type: NodeType.AUTOMATED
  title: string
  actionId: string
  actionParams: Record<string, string>
  retryOnFailure: boolean
}

export type EndNodeData = {
  type: NodeType.END
  completionMessage: string
  sendSummaryEmail: boolean
  markAsSuccess: boolean
  tags: Tag[]
}

export type WorkflowNodeData =
  | StartNodeData
  | TaskNodeData
  | ApprovalNodeData
  | AutomatedStepNodeData
  | EndNodeData

export type HRNode = Node<WorkflowNodeData>
export type HREdge = Edge

