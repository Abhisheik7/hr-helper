import type { EdgeChange, NodeChange } from '@xyflow/react'
import { applyEdgeChanges, applyNodeChanges } from '@xyflow/react'
import { create } from 'zustand'

import type { HREdge, HRNode, WorkflowNodeData, WorkflowTemplate } from '../types'
import { NodeType } from '../types'
import { exportWorkflowToJson, importWorkflowFromJson } from '../utils/workflowSerializer'

type HistoryEntry = { nodes: HRNode[]; edges: HREdge[]; workflowTitle: string }

const HISTORY_LIMIT = 50

function cloneNodes(nodes: HRNode[]): HRNode[] {
  return nodes.map((n) => ({ ...n, data: { ...n.data } }))
}

function cloneEdges(edges: HREdge[]): HREdge[] {
  return edges.map((e) => ({ ...e }))
}

function pushHistory(
  history: HistoryEntry[],
  historyIndex: number,
  entry: HistoryEntry,
): { history: HistoryEntry[]; historyIndex: number } {
  const trimmed = history.slice(0, historyIndex + 1)
  const next = [...trimmed, entry]
  const overflow = Math.max(0, next.length - HISTORY_LIMIT)
  const bounded = overflow > 0 ? next.slice(overflow) : next
  const nextIndex = bounded.length - 1
  return { history: bounded, historyIndex: nextIndex }
}

export type WorkflowState = {
  nodes: HRNode[]
  edges: HREdge[]
  selectedNodeId: string | null
  workflowTitle: string
  history: HistoryEntry[]
  historyIndex: number
  isDirty: boolean
  theme: 'light' | 'dark'
  isSimulating: boolean
  lastSimulationResult: import('../types').SimulationResult | null
  executingNodeIds: string[]

  setNodes: (nodes: HRNode[] | ((prev: HRNode[]) => HRNode[])) => void
  setEdges: (edges: HREdge[] | ((prev: HREdge[]) => HREdge[])) => void

  applyNodeChanges: (changes: NodeChange<HRNode>[]) => void
  applyEdgeChanges: (changes: EdgeChange<HREdge>[]) => void

  selectNode: (nodeId: string) => void
  deselectNode: () => void
  updateNodeData: (nodeId: string, patch: Partial<WorkflowNodeData>) => void

  undo: () => void
  redo: () => void

  setWorkflowTitle: (title: string) => void
  loadTemplate: (template: WorkflowTemplate) => void

  exportWorkflow: () => string
  importWorkflow: (json: string) => void

  setSimulating: (isSimulating: boolean) => void
  setSimulationResult: (result: import('../types').SimulationResult | null) => void
  setExecutingNodeIds: (nodeIds: string[]) => void

  toggleTheme: () => void
  resetCanvas: () => void
}

const DEFAULT_TITLE = 'Untitled Workflow'

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  workflowTitle: DEFAULT_TITLE,
  history: [{ nodes: [], edges: [], workflowTitle: DEFAULT_TITLE }],
  historyIndex: 0,
  isDirty: false,
  theme: 'light',
  isSimulating: false,
  lastSimulationResult: null,
  executingNodeIds: [],

  setNodes: (nodesOrUpdater) => {
    set((state) => {
      const nodes =
        typeof nodesOrUpdater === 'function' ? nodesOrUpdater(state.nodes) : nodesOrUpdater
      const entry: HistoryEntry = {
        nodes: cloneNodes(nodes),
        edges: cloneEdges(state.edges),
        workflowTitle: state.workflowTitle,
      }
      const next = pushHistory(state.history, state.historyIndex, entry)
      return { nodes, ...next, isDirty: true }
    })
  },

  setEdges: (edgesOrUpdater) => {
    set((state) => {
      const edges =
        typeof edgesOrUpdater === 'function' ? edgesOrUpdater(state.edges) : edgesOrUpdater
      const entry: HistoryEntry = {
        nodes: cloneNodes(state.nodes),
        edges: cloneEdges(edges),
        workflowTitle: state.workflowTitle,
      }
      const next = pushHistory(state.history, state.historyIndex, entry)
      return { edges, ...next, isDirty: true }
    })
  },

  applyNodeChanges: (changes) => {
    set((state) => {
      const nodes = applyNodeChanges(changes, state.nodes)
      const entry: HistoryEntry = {
        nodes: cloneNodes(nodes),
        edges: cloneEdges(state.edges),
        workflowTitle: state.workflowTitle,
      }
      const next = pushHistory(state.history, state.historyIndex, entry)
      return { nodes, ...next, isDirty: true }
    })
  },

  applyEdgeChanges: (changes) => {
    set((state) => {
      const edges = applyEdgeChanges(changes, state.edges)
      const entry: HistoryEntry = {
        nodes: cloneNodes(state.nodes),
        edges: cloneEdges(edges),
        workflowTitle: state.workflowTitle,
      }
      const next = pushHistory(state.history, state.historyIndex, entry)
      return { edges, ...next, isDirty: true }
    })
  },

  selectNode: (nodeId) => set({ selectedNodeId: nodeId }),
  deselectNode: () => set({ selectedNodeId: null }),

  updateNodeData: (nodeId, patch) => {
    set((state) => {
      const nodes = state.nodes.map((n) => {
        if (n.id !== nodeId) return n
        return { ...n, data: { ...n.data, ...patch } as WorkflowNodeData }
      })
      const entry: HistoryEntry = {
        nodes: cloneNodes(nodes),
        edges: cloneEdges(state.edges),
        workflowTitle: state.workflowTitle,
      }
      const next = pushHistory(state.history, state.historyIndex, entry)
      return { nodes, ...next, isDirty: true }
    })
  },

  undo: () => {
    const { history, historyIndex } = get()
    if (historyIndex <= 0) return
    const prevIndex = historyIndex - 1
    const snap = history[prevIndex]
    set({
      nodes: cloneNodes(snap.nodes),
      edges: cloneEdges(snap.edges),
      workflowTitle: snap.workflowTitle,
      historyIndex: prevIndex,
      selectedNodeId: null,
      isDirty: true,
    })
  },

  redo: () => {
    const { history, historyIndex } = get()
    if (historyIndex >= history.length - 1) return
    const nextIndex = historyIndex + 1
    const snap = history[nextIndex]
    set({
      nodes: cloneNodes(snap.nodes),
      edges: cloneEdges(snap.edges),
      workflowTitle: snap.workflowTitle,
      historyIndex: nextIndex,
      selectedNodeId: null,
      isDirty: true,
    })
  },

  setWorkflowTitle: (title) => {
    set((state) => {
      const workflowTitle = title.trim() || DEFAULT_TITLE
      const entry: HistoryEntry = {
        nodes: cloneNodes(state.nodes),
        edges: cloneEdges(state.edges),
        workflowTitle,
      }
      const next = pushHistory(state.history, state.historyIndex, entry)
      return { workflowTitle, ...next, isDirty: true }
    })
  },

  loadTemplate: (template) => {
    set((state) => {
      const nodes = cloneNodes(template.nodes)
      const edges = cloneEdges(template.edges)
      const workflowTitle = template.name
      const entry: HistoryEntry = { nodes: cloneNodes(nodes), edges: cloneEdges(edges), workflowTitle }
      const next = pushHistory(state.history, state.historyIndex, entry)
      return {
        nodes,
        edges,
        workflowTitle,
        selectedNodeId: null,
        lastSimulationResult: null,
        executingNodeIds: [],
        ...next,
        isDirty: true,
      }
    })
  },

  exportWorkflow: () => {
    const { nodes, edges, workflowTitle } = get()
    return exportWorkflowToJson({ nodes, edges, workflowTitle })
  },

  importWorkflow: (json) => {
    const imported = importWorkflowFromJson(json)
    set((state) => {
      const entry: HistoryEntry = {
        nodes: cloneNodes(imported.nodes),
        edges: cloneEdges(imported.edges),
        workflowTitle: imported.workflowTitle,
      }
      const next = pushHistory(state.history, state.historyIndex, entry)
      return {
        nodes: cloneNodes(imported.nodes),
        edges: cloneEdges(imported.edges),
        workflowTitle: imported.workflowTitle,
        selectedNodeId: null,
        lastSimulationResult: null,
        executingNodeIds: [],
        ...next,
        isDirty: true,
      }
    })
  },

  setSimulating: (isSimulating) => set({ isSimulating }),
  setSimulationResult: (result) => set({ lastSimulationResult: result }),
  setExecutingNodeIds: (nodeIds) => set({ executingNodeIds: nodeIds }),

  toggleTheme: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),

  resetCanvas: () => {
    set((state) => {
      const nodes: HRNode[] = []
      const edges: HREdge[] = []
      const workflowTitle = DEFAULT_TITLE
      const entry: HistoryEntry = { nodes: [], edges: [], workflowTitle }
      const next = pushHistory(state.history, state.historyIndex, entry)
      return {
        nodes,
        edges,
        workflowTitle,
        selectedNodeId: null,
        lastSimulationResult: null,
        executingNodeIds: [],
        ...next,
        isDirty: true,
      }
    })
  },
}))

export const NODE_TYPE_COLORS: Record<NodeType, string> = {
  [NodeType.START]: '#6DAF8A',
  [NodeType.TASK]: '#7B9FEA',
  [NodeType.APPROVAL]: '#E8A838',
  [NodeType.AUTOMATED]: '#A67BEA',
  [NodeType.END]: '#EA7B7B',
}

