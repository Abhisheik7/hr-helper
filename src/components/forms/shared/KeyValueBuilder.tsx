import { AnimatePresence, motion } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { useCallback } from 'react'

import type { MetadataEntry } from '../../../types'

type Props = {
  value: MetadataEntry[]
  onChange: (next: MetadataEntry[]) => void
}

function uid(): string {
  return Math.random().toString(16).slice(2, 10)
}

export function KeyValueBuilder({ value, onChange }: Props) {
  const addRow = useCallback(() => {
    onChange([...value, { id: `kv_${uid()}`, key: '', value: '' }])
  }, [onChange, value])

  const removeRow = useCallback(
    (id: string) => onChange(value.filter((r) => r.id !== id)),
    [onChange, value],
  )

  const update = useCallback(
    (id: string, patch: Partial<MetadataEntry>) => {
      onChange(value.map((r) => (r.id === id ? { ...r, ...patch } : r)))
    },
    [onChange, value],
  )

  return (
    <div className="space-y-2">
      <AnimatePresence initial={false}>
        {value.map((row) => (
          <motion.div
            key={row.id}
            layout
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex gap-2"
          >
            <input
              className="focus-ring w-1/2 rounded-input border border-border bg-surface px-3 py-2 text-sm text-text-primary"
              placeholder="Key"
              value={row.key}
              onChange={(e) => update(row.id, { key: e.target.value })}
            />
            <input
              className="focus-ring w-1/2 rounded-input border border-border bg-surface px-3 py-2 text-sm text-text-primary"
              placeholder="Value"
              value={row.value}
              onChange={(e) => update(row.id, { value: e.target.value })}
            />
            <button
              type="button"
              aria-label="Remove field"
              onClick={() => removeRow(row.id)}
              className="rounded-input border border-border bg-surface px-2 text-text-secondary transition-colors hover:text-text-primary"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      <button
        type="button"
        onClick={addRow}
        className="inline-flex items-center gap-2 rounded-input border border-border bg-surface px-3 py-2 text-sm font-medium text-text-primary shadow-ambient transition-all hover:shadow-warm"
      >
        <Plus className="h-4 w-4 text-accent" />
        Add Field
      </button>
    </div>
  )
}

