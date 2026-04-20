import { useRef } from 'react'
import { ArrowDownToLine, ArrowUpFromLine, Flag, Play, ShieldCheck, Zap } from 'lucide-react'
import { ClipboardList } from 'lucide-react'
import toast from 'react-hot-toast'

import { NodeType } from '../../types'
import { WORKFLOW_TEMPLATES } from '../../templates'
import { useWorkflowStore } from '../../store/workflowStore'
import { DraggableNodeCard } from './DraggableNodeCard'
import { TemplateCard } from './TemplateCard'

function downloadText(filename: string, contents: string) {
  const blob = new Blob([contents], { type: 'application/json;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function Sidebar() {
  const exportWorkflow = useWorkflowStore((s) => s.exportWorkflow)
  const importWorkflow = useWorkflowStore((s) => s.importWorkflow)
  const fileRef = useRef<HTMLInputElement | null>(null)

  return (
    <aside className="flex h-full w-[260px] flex-col border-r border-border bg-surface-muted">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-card bg-accent text-white shadow-ambient">
            <span className="text-lg font-bold">H</span>
          </div>
          <div>
            <div className="text-base font-bold tracking-tight text-text-primary">HR Helper</div>
            <div className="text-xs text-text-secondary">Workflow Designer</div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Workflow Nodes
        </div>
      </div>

      <div className="flex flex-col gap-2 px-4">
        <DraggableNodeCard
          nodeType={NodeType.START}
          color="#6DAF8A"
          icon={Play}
          name="Start"
          description="Entry point trigger"
        />
        <DraggableNodeCard
          nodeType={NodeType.TASK}
          color="#7B9FEA"
          icon={ClipboardList}
          name="Task"
          description="Assign work to a person/team"
        />
        <DraggableNodeCard
          nodeType={NodeType.APPROVAL}
          color="#E8A838"
          icon={ShieldCheck}
          name="Approval"
          description="Require sign-off before proceeding"
        />
        <DraggableNodeCard
          nodeType={NodeType.AUTOMATED}
          color="#A67BEA"
          icon={Zap}
          name="Automated"
          description="Execute a system automation"
        />
        <DraggableNodeCard
          nodeType={NodeType.END}
          color="#EA7B7B"
          icon={Flag}
          name="End"
          description="Finish the workflow"
        />
      </div>

      <div className="my-5 h-px bg-border" />

      <div className="px-4 pb-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Templates
        </div>
      </div>
      <div className="flex flex-col gap-2 px-4">
        {WORKFLOW_TEMPLATES.map((t) => (
          <TemplateCard key={t.id} template={t} />
        ))}
      </div>

      <div className="flex-1" />

      <div className="p-4">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              try {
                const json = exportWorkflow()
                downloadText('hr-helper-workflow.json', json)
                toast.success('Exported workflow JSON')
              } catch (e) {
                toast.error(e instanceof Error ? e.message : 'Export failed')
              }
            }}
            className="inline-flex items-center justify-center gap-2 rounded-input border border-border bg-white px-3 py-2 text-sm font-semibold text-text-primary shadow-ambient transition-all hover:shadow-warm"
            aria-label="Export JSON"
          >
            <ArrowDownToLine className="h-4 w-4 text-accent-dark" />
            Export
          </button>

          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center justify-center gap-2 rounded-input border border-border bg-white px-3 py-2 text-sm font-semibold text-text-primary shadow-ambient transition-all hover:shadow-warm"
            aria-label="Import JSON"
          >
            <ArrowUpFromLine className="h-4 w-4 text-accent-dark" />
            Import
          </button>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (!file) return
            const reader = new FileReader()
            reader.onload = () => {
              try {
                importWorkflow(String(reader.result ?? ''))
                toast.success('Imported workflow JSON')
              } catch (err) {
                toast.error(err instanceof Error ? err.message : 'Import failed')
              }
            }
            reader.readAsText(file)
            e.target.value = ''
          }}
        />
      </div>
    </aside>
  )
}

