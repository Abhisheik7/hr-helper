import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

import type { Tag } from '../../../types'

type Props = {
  value: Tag[]
  onChange: (next: Tag[]) => void
}

function uid(): string {
  return Math.random().toString(16).slice(2, 10)
}

export function TagInput({ value, onChange }: Props) {
  const [input, setInput] = useState('')

  const existing = useMemo(
    () => new Set(value.map((t) => t.label.trim().toLowerCase()).filter(Boolean)),
    [value],
  )

  const add = useCallback(() => {
    const label = input.trim()
    if (!label) return
    if (existing.has(label.toLowerCase())) {
      setInput('')
      return
    }
    onChange([...value, { id: `tag_${uid()}`, label }])
    setInput('')
  }, [existing, input, onChange, value])

  const remove = useCallback(
    (id: string) => onChange(value.filter((t) => t.id !== id)),
    [onChange, value],
  )

  return (
    <div className="space-y-2">
      <input
        className="focus-ring w-full rounded-input border border-border bg-surface px-3 py-2 text-sm text-text-primary"
        placeholder="Type a tag and press Enter"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            add()
          }
        }}
      />

      <div className="flex flex-wrap gap-2">
        <AnimatePresence initial={false}>
          {value.map((tag) => (
            <motion.div
              key={tag.id}
              layout
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 rounded-pill bg-accent/15 px-3 py-1 text-xs font-semibold text-accent-dark"
            >
              {tag.label}
              <button
                type="button"
                aria-label="Remove tag"
                onClick={() => remove(tag.id)}
                className="rounded-full p-0.5 text-accent-dark/80 transition-colors hover:text-accent-dark"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

