import type { WorkflowNodeData } from '../types'
import { NodeType } from '../types'

export type CompletionLevel = 'empty' | 'partial' | 'complete'

export function useNodeValidation(data: WorkflowNodeData): {
  isComplete: boolean
  completionLevel: CompletionLevel
} {
  const title = (() => {
    if (data.type === NodeType.END) return data.completionMessage.trim()
    return data.title.trim()
  })()

  if (!title) {
    return { isComplete: false, completionLevel: 'empty' }
  }

  const optionalFilled = (() => {
    switch (data.type) {
      case NodeType.START:
        return Boolean(data.triggerDescription.trim() || data.metadata.length > 0)
      case NodeType.TASK:
        return Boolean(
          data.description.trim() ||
            data.assignee.trim() ||
            data.dueDate.trim() ||
            data.customFields.length > 0,
        )
      case NodeType.APPROVAL:
        return Boolean(
          data.autoApproveAfterDays > 0 || data.escalationPath.trim() || data.requireComment,
        )
      case NodeType.AUTOMATED:
        return Boolean(data.actionId.trim() && Object.keys(data.actionParams).length > 0)
      case NodeType.END:
        return Boolean(data.tags.length > 0 || data.sendSummaryEmail || !data.markAsSuccess)
      default:
        return false
    }
  })()

  const requiredOk = (() => {
    switch (data.type) {
      case NodeType.START:
        return Boolean(data.title.trim())
      case NodeType.TASK:
        return Boolean(data.title.trim())
      case NodeType.APPROVAL:
        return Boolean(data.title.trim() && data.approverRole)
      case NodeType.AUTOMATED:
        return Boolean(data.title.trim() && data.actionId.trim())
      case NodeType.END:
        return Boolean(data.completionMessage.trim())
      default:
        return false
    }
  })()

  if (!requiredOk) {
    return { isComplete: false, completionLevel: 'partial' }
  }

  return { isComplete: true, completionLevel: optionalFilled ? 'complete' : 'partial' }
}

