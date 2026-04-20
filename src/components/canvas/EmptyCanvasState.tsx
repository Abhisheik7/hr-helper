import { AnimatePresence, motion } from 'framer-motion'

type Props = {
  visible: boolean
}

export function EmptyCanvasState({ visible }: Props) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="relative flex max-w-[440px] flex-col items-center gap-3 rounded-card border border-border bg-white/70 p-6 text-center shadow-ambient backdrop-blur">
            <svg width="120" height="64" viewBox="0 0 120 64" fill="none" aria-hidden="true">
              <rect x="8" y="20" width="26" height="24" rx="8" stroke="#D4CCC4" strokeWidth="2" />
              <rect x="47" y="10" width="26" height="24" rx="8" stroke="#D4CCC4" strokeWidth="2" />
              <rect x="86" y="22" width="26" height="24" rx="8" stroke="#D4CCC4" strokeWidth="2" />
              <path
                d="M34 32C40 32 41 22 47 22"
                stroke="#D4CCC4"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M73 22C79 22 80 34 86 34"
                stroke="#D4CCC4"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <div className="text-lg font-semibold tracking-tight text-text-primary">
              Drag a node to begin your workflow
            </div>
            <div className="text-sm text-text-secondary">
              Start by dragging a <span className="font-semibold text-text-primary">Start</span> node
              from the left sidebar.
            </div>

            <motion.div
              initial={{ x: 0 }}
              animate={{ x: -12 }}
              transition={{ duration: 0.9, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
              className="absolute -left-8 top-1/2 hidden -translate-y-1/2 items-center gap-2 md:flex"
            >
              <div className="h-px w-10 bg-border" />
              <div className="h-2.5 w-2.5 rotate-45 border-b-2 border-l-2 border-border" />
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

