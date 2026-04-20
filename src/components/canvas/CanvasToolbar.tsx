import { useEffect, useMemo, useRef, useState } from 'react'
import { Redo2, Undo2 } from 'lucide-react'
import clsx from 'clsx'

import { computeHealthScore } from '../../utils/healthScore'
import { useWorkflowStore } from '../../store/workflowStore'

function scoreColor(score: number): string {
  if (score < 40) return '#D45F5F'
  if (score < 70) return '#E8A838'
  return '#6DAF8A'
}

function CircleScore({ score }: { score: number }) {
  const r = 13
  const c = 2 * Math.PI * r
  const dash = (c * score) / 100
  const stroke = scoreColor(score)

  return (
    <div className="flex items-center gap-2">
      <div className="relative h-8 w-8">
        <svg viewBox="0 0 40 40" className="h-8 w-8">
          <circle cx="20" cy="20" r={r} stroke="#EDE8DC" strokeWidth="4" fill="none" />
          <circle
            cx="20"
            cy="20"
            r={r}
            stroke={stroke}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${c}`}
            transform="rotate(-90 20 20)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-text-primary">
          {score}
        </div>
      </div>
      <div className="text-xs font-semibold text-text-secondary">Health</div>
    </div>
  )
}

export function CanvasToolbar() {
  const nodes = useWorkflowStore((s) => s.nodes)
  const edges = useWorkflowStore((s) => s.edges)
  const workflowTitle = useWorkflowStore((s) => s.workflowTitle)
  const setWorkflowTitle = useWorkflowStore((s) => s.setWorkflowTitle)
  const undo = useWorkflowStore((s) => s.undo)
  const redo = useWorkflowStore((s) => s.redo)

  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(workflowTitle)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (isEditing) inputRef.current?.focus()
  }, [isEditing])

  const score = useMemo(() => computeHealthScore(nodes, edges), [nodes, edges])

  return (
    <div className="pointer-events-auto absolute left-1/2 top-4 z-20 -translate-x-1/2">
      <div className="glass flex items-center gap-3 rounded-xl px-3 py-2 shadow-ambient">
        <div className="min-w-[220px]">
          {!isEditing ? (
            <button
              type="button"
              className="max-w-[220px] truncate text-left text-sm font-semibold tracking-tight text-text-primary"
              onClick={() => {
                setDraft(workflowTitle)
                setIsEditing(true)
              }}
              aria-label="Edit workflow title"
            >
              {workflowTitle}
            </button>
          ) : (
            <input
              ref={inputRef}
              className="focus-ring w-[220px] rounded-input border border-border bg-white px-3 py-2 text-sm font-semibold text-text-primary"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={() => {
                setIsEditing(false)
                setWorkflowTitle(draft)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setIsEditing(false)
                  setWorkflowTitle(draft)
                }
                if (e.key === 'Escape') {
                  setIsEditing(false)
                  setDraft(workflowTitle)
                }
              }}
            />
          )}
        </div>

        <div className="h-6 w-px bg-border" />

        <div className="flex items-center gap-2">
          <div className="rounded-pill bg-surface-muted px-2 py-1 text-[11px] font-semibold text-text-secondary">
            {nodes.length} nodes
          </div>
          <div className="rounded-pill bg-surface-muted px-2 py-1 text-[11px] font-semibold text-text-secondary">
            {edges.length} edges
          </div>
        </div>

        <div className="h-6 w-px bg-border" />

        <button
          type="button"
          onClick={undo}
          className={clsx(
            'inline-flex items-center gap-2 rounded-input border border-border bg-white px-2.5 py-2 text-sm font-semibold text-text-primary shadow-ambient transition-all hover:shadow-warm',
          )}
          aria-label="Undo"
          title="Undo (⌘Z)"
        >
          <Undo2 className="h-4 w-4 text-accent-dark" />
        </button>
        <button
          type="button"
          onClick={redo}
          className={clsx(
            'inline-flex items-center gap-2 rounded-input border border-border bg-white px-2.5 py-2 text-sm font-semibold text-text-primary shadow-ambient transition-all hover:shadow-warm',
          )}
          aria-label="Redo"
          title="Redo (⌘⇧Z)"
        >
          <Redo2 className="h-4 w-4 text-accent-dark" />
        </button>

        <div className="h-6 w-px bg-border" />

        <CircleScore score={score} />

        <button
          type="button"
          className={clsx(
            'ml-1 inline-flex items-center justify-center rounded-input px-3 py-2 text-sm font-semibold text-white shadow-ambient transition-all',
            score === 100 ? 'bg-accent animate-pulse' : 'bg-accent/80',
          )}
          aria-label="Run workflow"
        >
          ▶ Run
        </button>
      </div>
    </div>
  )
}

