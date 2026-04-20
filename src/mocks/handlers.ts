import { HttpResponse, delay, http } from 'msw'

import type {
  Automation,
  AutomationsResponse,
  SimulateRequest,
  SimulateResponse,
  SimulationResult,
  SimulationStep,
} from '../types'
import { NodeType } from '../types'

const AUTOMATIONS: Automation[] = [
  {
    id: 'send_email',
    label: 'Send Email',
    icon: 'mail',
    params: [
      { key: 'to', label: 'Recipient Email', type: 'email' },
      { key: 'subject', label: 'Email Subject', type: 'text' },
      { key: 'template', label: 'Template Name', type: 'text' },
    ],
  },
  {
    id: 'generate_doc',
    label: 'Generate Document',
    icon: 'file-text',
    params: [
      { key: 'template', label: 'Template ID', type: 'text' },
      { key: 'recipient', label: 'Recipient', type: 'text' },
    ],
  },
  {
    id: 'notify_slack',
    label: 'Slack Notification',
    icon: 'message-square',
    params: [
      { key: 'channel', label: 'Channel Name', type: 'text' },
      { key: 'message', label: 'Message', type: 'text' },
    ],
  },
  {
    id: 'update_hris',
    label: 'Update HRIS Record',
    icon: 'database',
    params: [
      { key: 'employee_id', label: 'Employee ID', type: 'text' },
      { key: 'field', label: 'Field to Update', type: 'text' },
      { key: 'value', label: 'New Value', type: 'text' },
    ],
  },
  {
    id: 'schedule_meeting',
    label: 'Schedule Meeting',
    icon: 'calendar',
    params: [
      { key: 'attendees', label: 'Attendees (comma-separated)', type: 'text' },
      { key: 'duration', label: 'Duration (minutes)', type: 'number' },
    ],
  },
]

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function titleForNode(nodeType: string, data: unknown): string {
  if (nodeType === NodeType.END) {
    const d = data as { completionMessage?: string }
    return d.completionMessage ?? ''
  }
  const d = data as { title?: string }
  return d.title ?? ''
}

function messageForNode(nodeType: string, title: string): string {
  switch (nodeType) {
    case NodeType.START:
      return `Trigger activated: ${title || 'Start'} — initializing workflow context.`
    case NodeType.TASK:
      return `Task queued: ${title || 'Task'} — assigned and awaiting completion.`
    case NodeType.APPROVAL:
      return `Approval requested: ${title || 'Approval'} — routing to the approver chain.`
    case NodeType.AUTOMATED:
      return `Automation executed: ${title || 'Automated Step'} — action dispatched successfully.`
    case NodeType.END:
      return `Workflow completed: ${title || 'End'} — finalization steps recorded.`
    default:
      return `Step processed: ${title || 'Node'} — completed.`
  }
}

export const handlers = [
  http.get('/api/automations', () => {
    const body: AutomationsResponse = AUTOMATIONS
    return HttpResponse.json(body)
  }),

  http.post('/api/simulate', async ({ request }) => {
    const payload = (await request.json()) as SimulateRequest
    await delay(1200)

    const now = Date.now()
    const executionId = `exec_${Math.random().toString(16).slice(2, 10)}`

    const steps: SimulationStep[] = payload.nodes.map((n, idx) => {
      const durationMs = randomInt(200, 800)
      const timestamp = new Date(now + idx * 250).toISOString()
      const nodeType = n.data.type
      const nodeTitle = titleForNode(nodeType, n.data)

      return {
        stepNumber: idx + 1,
        nodeId: n.id,
        nodeType,
        nodeTitle: nodeTitle || nodeType,
        status: 'completed',
        duration: `${durationMs}ms`,
        message: messageForNode(nodeType, nodeTitle),
        timestamp,
      }
    })

    const result: SimulationResult = {
      success: true,
      executionId,
      totalSteps: payload.nodes.length,
      steps,
    }

    const response: SimulateResponse = result
    return HttpResponse.json(response)
  }),
]

