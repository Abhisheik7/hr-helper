import { ShieldCheck } from 'lucide-react'
import { memo } from 'react'
import type { NodeProps } from '@xyflow/react'

import type { HRNode } from '../../types'
import { NodeType } from '../../types'
import { BaseNode } from './BaseNode'

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-pill bg-surface-muted px-2 py-1 text-[11px] font-medium text-text-secondary">
      {children}
    </div>
  )
}

export const ApprovalNode = memo(function ApprovalNode(props: NodeProps<HRNode>) {
  const data = props.data
  const title = data.type === NodeType.APPROVAL ? data.title : ''
  const role = data.type === NodeType.APPROVAL ? data.approverRole : 'Manager'
  const autoDays = data.type === NodeType.APPROVAL ? data.autoApproveAfterDays : 0

  return (
    <BaseNode
      id={props.id}
      data={props.data}
      selected={Boolean(props.selected)}
      title={title}
      icon={ShieldCheck}
      typeLabel="APPROVAL"
      accentClasses={{
        borderLeft: 'border-l-[#E8A838]',
        pill: 'bg-[#E8A838]/15 text-[#B77B00]',
        handle: '!bg-[#E8A838]',
      }}
    >
      <Chip>{role}</Chip>
      {autoDays > 0 ? <Chip>{`Auto: ${autoDays}d`}</Chip> : null}
    </BaseNode>
  )
})

