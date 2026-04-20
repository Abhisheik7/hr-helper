import { Flag } from 'lucide-react'
import { memo } from 'react'
import clsx from 'clsx'
import type { NodeProps } from '@xyflow/react'

import type { HRNode } from '../../types'
import { NodeType } from '../../types'
import { BaseNode } from './BaseNode'

export const EndNode = memo(function EndNode(props: NodeProps<HRNode>) {
  const data = props.data
  const message = data.type === NodeType.END ? data.completionMessage : ''
  const sendSummary = data.type === NodeType.END ? data.sendSummaryEmail : false

  return (
    <BaseNode
      id={props.id}
      data={props.data}
      selected={Boolean(props.selected)}
      title={message}
      icon={Flag}
      typeLabel="END"
      accentClasses={{
        borderLeft: 'border-l-[#EA7B7B]',
        pill: 'bg-[#EA7B7B]/15 text-[#D45F5F]',
        handle: '!bg-[#EA7B7B]',
      }}
    >
      <div className="flex items-center gap-2 rounded-pill bg-surface-muted px-2 py-1 text-[11px] font-medium text-text-secondary">
        <span className="line-clamp-1 max-w-[160px]">{message || 'Completion message'}</span>
        <span
          aria-label={sendSummary ? 'Summary email enabled' : 'Summary email disabled'}
          className={clsx('h-2 w-2 rounded-full', sendSummary ? 'bg-accent' : 'bg-border')}
        />
      </div>
    </BaseNode>
  )
})

