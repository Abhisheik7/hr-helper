import React from 'react'

type Props = {
  label: string
  error?: string
  children: React.ReactNode
}

export function FormField({ label, error, children }: Props) {
  return (
    <div className="space-y-1">
      <div className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
        {label}
      </div>
      <div>{children}</div>
      {error ? <div className="text-xs text-status-error">{error}</div> : null}
    </div>
  )
}

