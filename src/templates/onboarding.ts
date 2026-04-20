import type { WorkflowTemplate } from '../types'
import { NodeType } from '../types'

const y = 200
const x0 = 50
const dx = 220

export const onboardingTemplate: WorkflowTemplate = {
  id: 'onboarding',
  name: 'Employee Onboarding',
  description: 'A complete onboarding flow from trigger to HRIS update.',
  icon: 'user-plus',
  nodes: [
    {
      id: 'onb_start',
      type: 'start',
      position: { x: x0 + dx * 0, y },
      data: {
        type: NodeType.START,
        title: 'New Hire Joins',
        triggerDescription: 'Triggered when a new employee is added.',
        metadata: [],
      },
    },
    {
      id: 'onb_task_docs',
      type: 'task',
      position: { x: x0 + dx * 1, y },
      data: {
        type: NodeType.TASK,
        title: 'Collect Documents',
        description: '',
        assignee: 'HR Team',
        dueDate: '',
        priority: 'high',
        customFields: [],
      },
    },
    {
      id: 'onb_task_it',
      type: 'task',
      position: { x: x0 + dx * 2, y },
      data: {
        type: NodeType.TASK,
        title: 'IT Setup',
        description: '',
        assignee: 'IT Department',
        dueDate: '',
        priority: 'medium',
        customFields: [],
      },
    },
    {
      id: 'onb_approval_mgr',
      type: 'approval',
      position: { x: x0 + dx * 3, y },
      data: {
        type: NodeType.APPROVAL,
        title: 'Manager Sign-off',
        approverRole: 'Manager',
        autoApproveAfterDays: 0,
        requireComment: false,
        escalationPath: '',
      },
    },
    {
      id: 'onb_auto_email',
      type: 'automated',
      position: { x: x0 + dx * 4, y },
      data: {
        type: NodeType.AUTOMATED,
        title: 'Send Welcome Email',
        actionId: 'send_email',
        actionParams: {},
        retryOnFailure: true,
      },
    },
    {
      id: 'onb_auto_hris',
      type: 'automated',
      position: { x: x0 + dx * 5, y },
      data: {
        type: NodeType.AUTOMATED,
        title: 'Update HRIS Record',
        actionId: 'update_hris',
        actionParams: {},
        retryOnFailure: true,
      },
    },
    {
      id: 'onb_end',
      type: 'end',
      position: { x: x0 + dx * 6, y },
      data: {
        type: NodeType.END,
        completionMessage: 'Employee onboarding finished',
        sendSummaryEmail: true,
        markAsSuccess: true,
        tags: [],
      },
    },
  ],
  edges: [
    { id: 'e_onb_1', source: 'onb_start', target: 'onb_task_docs', type: 'default' },
    { id: 'e_onb_2', source: 'onb_task_docs', target: 'onb_task_it', type: 'default' },
    { id: 'e_onb_3', source: 'onb_task_it', target: 'onb_approval_mgr', type: 'default' },
    { id: 'e_onb_4', source: 'onb_approval_mgr', target: 'onb_auto_email', type: 'default' },
    { id: 'e_onb_5', source: 'onb_auto_email', target: 'onb_auto_hris', type: 'default' },
    { id: 'e_onb_6', source: 'onb_auto_hris', target: 'onb_end', type: 'default' },
  ],
}

