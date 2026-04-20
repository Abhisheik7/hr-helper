import type { LucideIcon } from 'lucide-react'
import clsx from 'clsx'

import type { NodeType } from '../../types'

type Props = {
  nodeType: NodeType
  color: string
  icon: LucideIcon
  name: string
  description: string
}

export function DraggableNodeCard({ nodeType, color, icon: Icon, name, description }: Props) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('nodeType', nodeType)
        e.dataTransfer.effectAllowed = 'move'
      }}
      className={clsx(
        'group cursor-grab select-none rounded-card border border-border bg-white p-3 shadow-ambient transition-all duration-200 ease-premium',
        'hover:-translate-y-0.5 hover:shadow-warm',
        'active:cursor-grabbing',
      )}
      style={{ borderLeft: `4px solid ${color}` }}
      aria-label={`Drag ${name} node`}
    >
      <div className="flex items-start gap-3">
        <div
          className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-input"
          style={{ background: `${color}1f` }}
        >
          <Icon className="h-4 w-4" style={{ color }} />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-text-primary">{name}</div>
          <div className="mt-0.5 line-clamp-1 text-xs text-text-secondary">{description}</div>
        </div>
      </div>
    </div>
  )
}

