import type { WorkflowTemplate } from '../types'
import { NodeType } from '../types'

const y = 200
const x0 = 50
const dx = 220

export const documentVerificationTemplate: WorkflowTemplate = {
  id: 'document_verification',
  name: 'Document Verification',
  description: 'Generate, review, approve, and notify stakeholders.',
  icon: 'file-check',
  nodes: [
    {
      id: 'dv_start',
      type: 'start',
      position: { x: x0 + dx * 0, y },
      data: {
        type: NodeType.START,
        title: 'Document Submitted',
        triggerDescription: 'Triggered when a document is submitted.',
        metadata: [],
      },
    },
    {
      id: 'dv_auto_gen',
      type: 'automated',
      position: { x: x0 + dx * 1, y },
      data: {
        type: NodeType.AUTOMATED,
        title: 'Generate Verification Doc',
        actionId: 'generate_doc',
        actionParams: {},
        retryOnFailure: true,
      },
    },
    {
      id: 'dv_task_review',
      type: 'task',
      position: { x: x0 + dx * 2, y },
      data: {
        type: NodeType.TASK,
        title: 'HR Review',
        description: '',
        assignee: 'HR Team',
        dueDate: '',
        priority: 'high',
        customFields: [],
      },
    },
    {
      id: 'dv_approval_dir',
      type: 'approval',
      position: { x: x0 + dx * 3, y },
      data: {
        type: NodeType.APPROVAL,
        title: 'Director Sign-off',
        approverRole: 'Director',
        autoApproveAfterDays: 0,
        requireComment: false,
        escalationPath: '',
      },
    },
    {
      id: 'dv_auto_notify',
      type: 'automated',
      position: { x: x0 + dx * 4, y },
      data: {
        type: NodeType.AUTOMATED,
        title: 'Send Notification',
        actionId: 'notify_slack',
        actionParams: {},
        retryOnFailure: true,
      },
    },
    {
      id: 'dv_end',
      type: 'end',
      position: { x: x0 + dx * 5, y },
      data: {
        type: NodeType.END,
        completionMessage: 'Verification complete',
        sendSummaryEmail: true,
        markAsSuccess: true,
        tags: [],
      },
    },
  ],
  edges: [
    { id: 'e_dv_1', source: 'dv_start', target: 'dv_auto_gen', type: 'default' },
    { id: 'e_dv_2', source: 'dv_auto_gen', target: 'dv_task_review', type: 'default' },
    { id: 'e_dv_3', source: 'dv_task_review', target: 'dv_approval_dir', type: 'default' },
    { id: 'e_dv_4', source: 'dv_approval_dir', target: 'dv_auto_notify', type: 'default' },
    { id: 'e_dv_5', source: 'dv_auto_notify', target: 'dv_end', type: 'default' },
  ],
}

