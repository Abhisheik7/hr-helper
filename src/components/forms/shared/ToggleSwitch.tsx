import clsx from 'clsx'

type Props = {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  ariaLabel: string
}

export function ToggleSwitch({ checked, onChange, label, ariaLabel }: Props) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between gap-3 rounded-input border border-border bg-surface px-3 py-2 shadow-ambient transition-all duration-200 ease-premium"
    >
      {label ? <span className="text-sm font-medium text-text-primary">{label}</span> : null}
      <span
        className={clsx(
          'relative h-5 w-9 rounded-full transition-colors duration-200 ease-premium',
          checked ? 'bg-accent' : 'bg-[#D1CBC3]',
        )}
      >
        <span
          className={clsx(
            'absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ease-premium',
            checked ? 'translate-x-[18px]' : 'translate-x-0.5',
          )}
        />
      </span>
    </button>
  )
}

