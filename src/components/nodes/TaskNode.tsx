import { ClipboardList, User } from 'lucide-react'
import { memo } from 'react'
import clsx from 'clsx'
import type { NodeProps } from '@xyflow/react'

import type { HRNode } from '../../types'
import { NodeType } from '../../types'
import { BaseNode } from './BaseNode'

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-pill bg-surface-muted px-2 py-1 text-[11px] font-medium text-text-secondary">
      {children}
    </div>
  )
}

function PriorityDot({ priority }: { priority: 'low' | 'medium' | 'high' | 'critical' }) {
  const color =
    priority === 'low'
      ? 'bg-[#A8A29E]'
      : priority === 'medium'
        ? 'bg-[#7B9FEA]'
        : priority === 'high'
          ? 'bg-[#E8A838]'
          : 'bg-[#D45F5F]'
  return <span className={clsx('h-2 w-2 rounded-full', color)} />
}

export const TaskNode = memo(function TaskNode(props: NodeProps<HRNode>) {
  const data = props.data
  const title = data.type === NodeType.TASK ? data.title : ''
  const assignee = data.type === NodeType.TASK ? data.assignee : ''
  const priority = data.type === NodeType.TASK ? data.priority : 'low'

  return (
    <BaseNode
      id={props.id}
      data={props.data}
      selected={Boolean(props.selected)}
      title={title}
      icon={ClipboardList}
      typeLabel="TASK"
      accentClasses={{
        borderLeft: 'border-l-[#7B9FEA]',
        pill: 'bg-[#7B9FEA]/15 text-[#7B9FEA]',
        handle: '!bg-[#7B9FEA]',
      }}
    >
      {assignee.trim() ? (
        <Chip>
          <User className="h-3.5 w-3.5 text-text-muted" />
          <span className="max-w-[150px] truncate">{assignee}</span>
        </Chip>
      ) : null}
      <Chip>
        <PriorityDot priority={priority} />
        <span className="capitalize">{priority}</span>
      </Chip>
    </BaseNode>
  )
})

