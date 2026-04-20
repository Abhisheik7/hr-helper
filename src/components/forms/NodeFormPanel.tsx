import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useMemo } from 'react'
import clsx from 'clsx'

import type { HRNode } from '../../types'
import { NodeType } from '../../types'
import { useWorkflowStore } from '../../store/workflowStore'

function colorFor(type: NodeType): string {
  switch (type) {
    case NodeType.START:
      return '#6DAF8A'
    case NodeType.TASK:
      return '#7B9FEA'
    case NodeType.APPROVAL:
      return '#E8A838'
    case NodeType.AUTOMATED:
      return '#A67BEA'
    case NodeType.END:
      return '#EA7B7B'
  }
}

export function NodeFormPanel() {
  const selectedNodeId = useWorkflowStore((s) => s.selectedNodeId)
  const nodes = useWorkflowStore((s) => s.nodes)
  const deselectNode = useWorkflowStore((s) => s.deselectNode)
  const selectNode = useWorkflowStore((s) => s.selectNode)

  const selected = useMemo<HRNode | null>(
    () => (selectedNodeId ? nodes.find((n) => n.id === selectedNodeId) ?? null : null),
    [nodes, selectedNodeId],
  )

  const crumbs = useMemo(() => {
    return nodes.map((n) => ({
      id: n.id,
      label:
        n.data.type === NodeType.END
          ? n.data.completionMessage || 'End'
          : (n.data as { title?: string }).title || n.data.type,
      type: n.data.type,
    }))
  }, [nodes])

  const topBorder = selected ? colorFor(selected.data.type) : '#EDE8DC'

  return (
    <AnimatePresence>
      {selected ? (
        <motion.aside
          initial={{ x: 320 }}
          animate={{ x: 0 }}
          exit={{ x: 320 }}
          transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          className="h-full w-[320px] border-l border-border bg-white shadow-ambient"
          aria-label="Node configuration panel"
        >
          <div className="h-full overflow-hidden">
            <div className="h-full overflow-y-auto">
              <div className="border-b border-border p-4" style={{ borderTop: `4px solid ${topBorder}` }}>
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-text-primary">Configure Node</div>
                    <div className="mt-0.5 truncate text-xs text-text-secondary">{selected.data.type}</div>
                  </div>
                  <button
                    type="button"
                    onClick={deselectNode}
                    className="rounded-input border border-border bg-white p-2 text-text-secondary shadow-ambient transition-colors hover:text-text-primary"
                    aria-label="Close panel"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {crumbs.map((c) => {
                    const active = c.id === selected.id
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => selectNode(c.id)}
                        className={clsx(
                          'max-w-[140px] truncate rounded-pill px-3 py-1 text-[11px] font-semibold transition-all',
                          active
                            ? 'bg-accent text-white shadow-ambient'
                            : 'bg-surface-muted text-text-secondary hover:bg-white hover:shadow-ambient',
                        )}
                        aria-label={`Navigate to ${c.label}`}
                      >
                        {c.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="p-4 text-sm text-text-secondary">
                The detailed node forms are being wired next. For now, you can select nodes on the
                canvas and see this panel slide in.
              </div>
            </div>

            <div className="border-t border-border p-4">
              <button
                type="button"
                className="w-full rounded-input bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-ambient transition-all hover:bg-accent-dark"
                aria-label="Apply changes"
              >
                Apply Changes
              </button>
              <button
                type="button"
                className="mt-2 w-full rounded-input border border-status-error/30 bg-white px-4 py-2.5 text-sm font-semibold text-status-error shadow-ambient transition-colors hover:bg-status-error/5"
                aria-label="Delete node"
              >
                Delete Node
              </button>
            </div>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  )
}

