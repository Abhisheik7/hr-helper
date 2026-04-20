import { Layers } from 'lucide-react'
import clsx from 'clsx'

import type { WorkflowTemplate } from '../../types'
import { useWorkflowStore } from '../../store/workflowStore'

type Props = {
  template: WorkflowTemplate
}

export function TemplateCard({ template }: Props) {
  const loadTemplate = useWorkflowStore((s) => s.loadTemplate)
  return (
    <button
      type="button"
      onClick={() => loadTemplate(template)}
      className={clsx(
        'w-full rounded-card border border-border bg-white p-3 text-left shadow-ambient transition-all duration-200 ease-premium',
        'hover:shadow-warm hover:border-accent/50',
      )}
      aria-label={`Load template ${template.name}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="inline-flex h-7 w-7 items-center justify-center rounded-input bg-accent/15 text-accent-dark">
              <Layers className="h-4 w-4" />
            </div>
            <div className="truncate text-sm font-semibold text-text-primary">{template.name}</div>
          </div>
          <div className="mt-1 line-clamp-2 text-xs text-text-secondary">{template.description}</div>
        </div>
        <div className="shrink-0 rounded-pill bg-surface-muted px-2 py-1 text-[11px] font-semibold text-text-secondary">
          {template.nodes.length} nodes
        </div>
      </div>
    </button>
  )
}

