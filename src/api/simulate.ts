import type { SimulateRequest, SimulationResult } from '../types'

export async function simulateWorkflow(request: SimulateRequest): Promise<SimulationResult> {
  const res = await fetch('/api/simulate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })
  if (!res.ok) throw new Error('Simulation failed')
  return (await res.json()) as SimulationResult
}

