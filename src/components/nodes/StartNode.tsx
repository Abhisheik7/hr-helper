import { Play } from 'lucide-react'
import { memo } from 'react'
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

export const StartNode = memo(function StartNode(props: NodeProps<HRNode>) {
  const data = props.data
  const title = data.type === NodeType.START ? data.title : ''
  const trigger = data.type === NodeType.START ? data.triggerDescription : ''

  return (
    <BaseNode
      id={props.id}
      data={props.data}
      selected={Boolean(props.selected)}
      title={title}
      icon={Play}
      typeLabel="START"
      accentClasses={{
        borderLeft: 'border-l-[#6DAF8A]',
        pill: 'bg-[#6DAF8A]/15 text-[#6DAF8A]',
        handle: '!bg-[#6DAF8A]',
      }}
    >
      {trigger.trim() ? (
        <Chip>
          <span className="line-clamp-1 max-w-[190px]">{trigger}</span>
        </Chip>
      ) : null}
    </BaseNode>
  )
})

