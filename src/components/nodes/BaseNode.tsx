import { Handle, Position } from '@xyflow/react'
import type { LucideIcon } from 'lucide-react'
import React, { memo, useMemo } from 'react'
import clsx from 'clsx'

import type { WorkflowNodeData } from '../../types'
import { useNodeValidation } from '../../hooks/useNodeValidation'
import { useWorkflowStore } from '../../store/workflowStore'

type Props = {
  id: string
  data: WorkflowNodeData
  selected: boolean
  accentClasses: {
    borderLeft: string
    pill: string
    handle: string
  }
  icon: LucideIcon
  typeLabel: string
  children?: React.ReactNode
  title: string
}

function statusClass(level: 'empty' | 'partial' | 'complete'): string {
  if (level === 'empty') return 'bg-status-error'
  if (level === 'partial') return 'bg-status-warning'
  return 'bg-status-success'
}

export const BaseNode = memo(function BaseNode({
  id,
  data,
  selected,
  accentClasses,
  icon: Icon,
  typeLabel,
  children,
  title,
}: Props) {
  const selectNode = useWorkflowStore((s) => s.selectNode)
  const { completionLevel } = useNodeValidation(data)

  const status = useMemo(() => statusClass(completionLevel), [completionLevel])

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Node ${typeLabel}`}
      onClick={() => selectNode(id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') selectNode(id)
      }}
      className={clsx(
        'group relative w-[220px] cursor-pointer select-none rounded-card bg-surface p-3 shadow-warm transition-all duration-200 ease-premium',
        'border-l-4',
        accentClasses.borderLeft,
        'hover:shadow-warmLg hover:scale-[1.015]',
        selected && 'ring-2 ring-[#EA7B7B] drop-shadow-[0_0_18px_rgba(234,123,123,0.22)]',
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div
          className={clsx(
            'inline-flex items-center gap-1.5 rounded-pill px-2 py-1 text-[11px] font-semibold tracking-wide',
            accentClasses.pill,
          )}
        >
          <Icon className="h-3.5 w-3.5" />
          <span>{typeLabel}</span>
        </div>
      </div>

      <div className="mt-2">
        <div className="line-clamp-2 text-[15px] font-semibold leading-snug tracking-tight text-text-primary">
          {title || 'Untitled'}
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">{children}</div>

      <div
        aria-label={`Status ${completionLevel}`}
        className={clsx('absolute bottom-2 right-2 h-2 w-2 rounded-full', status)}
      />

      <Handle
        type="target"
        position={Position.Left}
        className={clsx(
          '!h-[10px] !w-[10px] !border-0 !opacity-0 transition-opacity duration-200 group-hover:!opacity-100',
          accentClasses.handle,
        )}
      />
      <Handle
        type="source"
        position={Position.Right}
        className={clsx(
          '!h-[10px] !w-[10px] !border-0 !opacity-0 transition-opacity duration-200 group-hover:!opacity-100',
          accentClasses.handle,
        )}
      />
    </div>
  )
})

