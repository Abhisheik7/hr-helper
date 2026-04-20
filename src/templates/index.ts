import type { WorkflowTemplate } from '../types'

import { documentVerificationTemplate } from './documentVerification'
import { leaveApprovalTemplate } from './leaveApproval'
import { onboardingTemplate } from './onboarding'

export const WORKFLOW_TEMPLATES: WorkflowTemplate[] = [
  onboardingTemplate,
  leaveApprovalTemplate,
  documentVerificationTemplate,
]
