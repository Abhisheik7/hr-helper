import '@xyflow/react/dist/style.css'

import { useCallback, useMemo, useRef } from 'react'
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  type Connection,
  type IsValidConnection,
  type Edge,
  type Node,
} from '@xyflow/react'

import { nodeTypes } from '../nodes'
import { useWorkflowStore } from '../../store/workflowStore'
import type { HREdge, HRNode, WorkflowNodeData } from '../../types'
import { NodeType } from '../../types'
import { EmptyCanvasState } from './EmptyCanvasState'
import { CanvasToolbar } from './CanvasToolbar'
import { CustomEdge } from './CustomEdge'

function uid(): string {
  return Math.random().toString(16).slice(2, 10)
}

function defaultData(nodeType: NodeType): WorkflowNodeData {
  switch (nodeType) {
    case NodeType.START:
      return { type: NodeType.START, title: '', triggerDescription: '', metadata: [] }
    case NodeType.TASK:
      return {
        type: NodeType.TASK,
        title: '',
        description: '',
        assignee: '',
        dueDate: '',
        priority: 'low',
        customFields: [],
      }
    case NodeType.APPROVAL:
      return {
        type: NodeType.APPROVAL,
        title: '',
        approverRole: 'Manager',
        autoApproveAfterDays: 0,
        requireComment: false,
        escalationPath: '',
      }
    case NodeType.AUTOMATED:
      return {
        type: NodeType.AUTOMATED,
        title: '',
        actionId: '',
        actionParams: {},
        retryOnFailure: true,
      }
    case NodeType.END:
      return {
        type: NodeType.END,
        completionMessage: '',
        sendSummaryEmail: false,
        markAsSuccess: true,
        tags: [],
      }
  }
}

function nodeKey(nodeType: NodeType): HRNode['type'] {
  switch (nodeType) {
    case NodeType.START:
      return 'start'
    case NodeType.TASK:
      return 'task'
    case NodeType.APPROVAL:
      return 'approval'
    case NodeType.AUTOMATED:
      return 'automated'
    case NodeType.END:
      return 'end'
  }
}

export function WorkflowCanvas() {
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const nodes = useWorkflowStore((s) => s.nodes)
  const edges = useWorkflowStore((s) => s.edges)
  const applyNodeChanges = useWorkflowStore((s) => s.applyNodeChanges)
  const applyEdgeChanges = useWorkflowStore((s) => s.applyEdgeChanges)
  const setEdges = useWorkflowStore((s) => s.setEdges)
  const setNodes = useWorkflowStore((s) => s.setNodes)
  const selectNode = useWorkflowStore((s) => s.selectNode)
  const deselectNode = useWorkflowStore((s) => s.deselectNode)
  const executingNodeIds = useWorkflowStore((s) => s.executingNodeIds)

  const edgeTypes = useMemo(() => ({ default: CustomEdge }), [])

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, type: 'default' }, eds as Edge[] as HREdge[]))
    },
    [setEdges],
  )

  const isValidConnection = useCallback<IsValidConnection>(
    (edgeOrConnection) => {
      const sourceId = edgeOrConnection.source
      const targetId = edgeOrConnection.target
      if (!sourceId || !targetId) return false
      const source = nodes.find((n) => n.id === sourceId)
      const target = nodes.find((n) => n.id === targetId)
      if (!source || !target) return false
      if (target.data.type === NodeType.START) return false
      if (source.data.type === NodeType.END) return false
      return true
    },
    [nodes],
  )

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()
      const raw = event.dataTransfer.getData('nodeType') as NodeType | ''
      if (!raw) return
      const rect = wrapperRef.current?.getBoundingClientRect()
      const x = rect ? event.clientX - rect.left : event.clientX
      const y = rect ? event.clientY - rect.top : event.clientY

      const id = `n_${uid()}`
      const node: HRNode = {
        id,
        type: nodeKey(raw),
        position: { x, y },
        data: defaultData(raw),
      }
      setNodes((prev) => [...prev, node])
      selectNode(id)
    },
    [selectNode, setNodes],
  )

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const decoratedNodes = useMemo(() => {
    const set = new Set(executingNodeIds)
    return nodes.map((n) => ({
      ...n,
      className: set.has(n.id)
        ? 'ring-2 ring-[#EA7B7B] drop-shadow-[0_0_18px_rgba(234,123,123,0.22)]'
        : undefined,
    }))
  }, [executingNodeIds, nodes])

  return (
    <div ref={wrapperRef} className="relative h-full w-full">
      <CanvasToolbar />
      <ReactFlow
        nodes={decoratedNodes as Node[]}
        edges={edges as Edge[]}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={(ch) => applyNodeChanges(ch as never)}
        onEdgesChange={(ch) => applyEdgeChanges(ch as never)}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
        onNodeClick={(_, n) => selectNode(n.id)}
        onPaneClick={() => deselectNode()}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#DDD8CC" gap={20} size={1} variant={BackgroundVariant.Dots} />
        <MiniMap
          pannable
          zoomable
          className="!bg-[#FFFBF1] !border !border-border !rounded-card !shadow-ambient"
        />
        <Controls className="!border !border-border !rounded-card !shadow-ambient" />
      </ReactFlow>

      <EmptyCanvasState visible={nodes.length === 0} />
    </div>
  )
}

