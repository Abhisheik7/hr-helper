import { Zap } from 'lucide-react'
import { memo, useMemo } from 'react'
import type { NodeProps } from '@xyflow/react'

import type { HRNode } from '../../types'
import { NodeType } from '../../types'
import { BaseNode } from './BaseNode'

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-pill bg-surface-muted px-2 py-1 text-[11px] font-medium text-text-secondary">
      {children}
    </div>
  )
}

function labelFromActionId(actionId: string): string {
  const map: Record<string, string> = {
    send_email: 'Send Email',
    generate_doc: 'Generate Document',
    notify_slack: 'Slack Notification',
    update_hris: 'Update HRIS Record',
    schedule_meeting: 'Schedule Meeting',
  }
  return map[actionId] ?? actionId
}

export const AutomatedStepNode = memo(function AutomatedStepNode(props: NodeProps<HRNode>) {
  const data = props.data
  const title = data.type === NodeType.AUTOMATED ? data.title : ''
  const actionId = data.type === NodeType.AUTOMATED ? data.actionId : ''

  const actionLabel = useMemo(() => (actionId ? labelFromActionId(actionId) : ''), [actionId])

  return (
    <BaseNode
      id={props.id}
      data={props.data}
      selected={Boolean(props.selected)}
      title={title}
      icon={Zap}
      typeLabel="AUTOMATED"
      accentClasses={{
        borderLeft: 'border-l-[#A67BEA]',
        pill: 'bg-[#A67BEA]/15 text-[#7F46D6]',
        handle: '!bg-[#A67BEA]',
      }}
    >
      {actionId.trim() ? <Chip>{actionLabel}</Chip> : <Chip>No action</Chip>}
    </BaseNode>
  )
})

