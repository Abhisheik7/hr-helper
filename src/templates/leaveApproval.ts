import type { WorkflowTemplate } from '../types'
import { NodeType } from '../types'

const y = 200
const x0 = 50
const dx = 220

export const leaveApprovalTemplate: WorkflowTemplate = {
  id: 'leave_approval',
  name: 'Leave Approval',
  description: 'Approve leave and automatically update systems + confirm.',
  icon: 'calendar-check',
  nodes: [
    {
      id: 'lv_start',
      type: 'start',
      position: { x: x0 + dx * 0, y },
      data: {
        type: NodeType.START,
        title: 'Leave Request Submitted',
        triggerDescription: 'Triggered when a leave request is submitted.',
        metadata: [],
      },
    },
    {
      id: 'lv_approval',
      type: 'approval',
      position: { x: x0 + dx * 1, y },
      data: {
        type: NodeType.APPROVAL,
        title: 'Manager Approval',
        approverRole: 'Manager',
        autoApproveAfterDays: 0,
        requireComment: false,
        escalationPath: '',
      },
    },
    {
      id: 'lv_auto_hris',
      type: 'automated',
      position: { x: x0 + dx * 2, y },
      data: {
        type: NodeType.AUTOMATED,
        title: 'Update Leave Balance',
        actionId: 'update_hris',
        actionParams: {},
        retryOnFailure: true,
      },
    },
    {
      id: 'lv_auto_email',
      type: 'automated',
      position: { x: x0 + dx * 3, y },
      data: {
        type: NodeType.AUTOMATED,
        title: 'Send Confirmation',
        actionId: 'send_email',
        actionParams: {},
        retryOnFailure: true,
      },
    },
    {
      id: 'lv_end',
      type: 'end',
      position: { x: x0 + dx * 4, y },
      data: {
        type: NodeType.END,
        completionMessage: 'Leave approved',
        sendSummaryEmail: true,
        markAsSuccess: true,
        tags: [],
      },
    },
  ],
  edges: [
    { id: 'e_lv_1', source: 'lv_start', target: 'lv_approval', type: 'default' },
    { id: 'e_lv_2', source: 'lv_approval', target: 'lv_auto_hris', type: 'default' },
    { id: 'e_lv_3', source: 'lv_auto_hris', target: 'lv_auto_email', type: 'default' },
    { id: 'e_lv_4', source: 'lv_auto_email', target: 'lv_end', type: 'default' },
  ],
}

