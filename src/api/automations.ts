import type { Automation } from '../types'

export async function fetchAutomations(): Promise<Automation[]> {
  const res = await fetch('/api/automations')
  if (!res.ok) throw new Error('Failed to fetch automations')
  return (await res.json()) as Automation[]
}

