import type { EdgeProps } from '@xyflow/react'
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from '@xyflow/react'
import clsx from 'clsx'

type Data = { isFast?: boolean; label?: string }

export function CustomEdge(props: EdgeProps) {
  const { id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, markerEnd, data } =
    props

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  })

  const d = (data ?? {}) as Data
  const duration = d.isFast ? '0.8s' : '2s'

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={{ stroke: '#D4CCC4', strokeWidth: 2 }} />
      <circle r={4} fill="#EA7B7B" className="edge-dot">
        <animateMotion dur={duration} repeatCount="indefinite" path={edgePath} />
      </circle>

      {d.label ? (
        <EdgeLabelRenderer>
          <div
            className={clsx(
              'nodrag nopan absolute -translate-x-1/2 -translate-y-1/2 rounded-pill border border-border bg-white px-2 py-1 text-[11px] font-semibold text-text-secondary shadow-ambient',
            )}
            style={{ left: labelX, top: labelY }}
          >
            {d.label}
          </div>
        </EdgeLabelRenderer>
      ) : null}
    </>
  )
}

