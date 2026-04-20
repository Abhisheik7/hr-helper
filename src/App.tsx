import { ReactFlowProvider } from '@xyflow/react'
import { Toaster } from 'react-hot-toast'

import { Sidebar } from './components/sidebar/Sidebar'
import { WorkflowCanvas } from './components/canvas/WorkflowCanvas'
import { NodeFormPanel } from './components/forms/NodeFormPanel'

export default function App() {
  return (
    <ReactFlowProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-[#FFFBF1] font-inter">
        <div className="h-full w-[260px] shrink-0">
          <Sidebar />
        </div>

        <div className="relative h-full flex-1">
          <WorkflowCanvas />
          <div className="absolute right-0 top-0 h-full">
            <NodeFormPanel />
          </div>
        </div>

        <Toaster position="bottom-right" />
      </div>
    </ReactFlowProvider>
  )
}
