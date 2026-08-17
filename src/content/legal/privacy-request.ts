/**
 * Approved copy, transcribed from `content/pages/21-privacy-request.md` and
 * `legal/01-FORM-AND-CONSENT-COPY.md` §7.
 *
 * Three places where the two approved sources disagree, and the choice made in
 * each. All three are logged in CONTENT_VERIFICATION.md P1–P3.
 *
 * 1. Request type. `21-privacy-request.md` specifies a multi-select;
 *    `docs/15` §9 and `docs/16` §9 both model a single `requestType` against a
 *    case record with one due date, one outcome, and one appeal status. Single
 *    select is implemented, because a case record cannot carry two deadlines.
 *
 * 2. Relationship options. The label sets differ slightly between the two
 *    documents. `legal/01` §7 labels are used because they map cleanly onto the
 *    `docs/15` §9 enum values that the server validates against.
 *
 * 3. Authorized-agent fields. `21-privacy-request.md` asks for a conditional
 *    block of agent fields. Conditional fields would disappear without
 *    JavaScript, and `docs/16` §8 requires data minimisation, so the agent
 *    checkbox stays and the details field asks for the consumer's identity and
 *    the basis of authority. No document upload is offered, which the same
 *    source permits only "if implemented and approved".
 */

export const meta = {
  title: 'Submit a Privacy Request | Hendricks',
  description:
    'Request access to, correction of, deletion of, or another applicable action concerning personal information maintained by Hendricks.',
} as const

export const hero = {
  eyebrow: 'Privacy Requests',
  title: 'Submit a Privacy Request',
  lead: [
    'Use this form to request access to, correction of, deletion of, portability of, restriction of, or another applicable action concerning personal information maintained by Hendricks.',
    'Hendricks may request additional information when reasonably necessary to verify your identity, locate relevant records, protect against fraud, or confirm that an authorized agent may act for you. Do not submit government identification, financial-account information, health information, passwords, or other sensitive material unless Hendricks specifically requests it through a secure method.',
    'This form is not for service inquiries. For a commercial inquiry, use the Contact or Search Intelligence Diagnostic form.',
  ],
} as const

export const relationshipOptions = [
  { value: 'website-visitor', label: 'Website visitor' },
  { value: 'inquiry-submitter', label: 'Inquiry submitter' },
  { value: 'marketing-subscriber', label: 'Marketing subscriber' },
  { value: 'client-representative', label: 'Current or former client representative' },
  { value: 'agency-partner-representative', label: 'Agency-partner representative' },
  { value: 'authorized-agent', label: 'Authorized agent' },
  { value: 'other', label: 'Other' },
] as const

export const requestTypeOptions = [
  { value: 'access', label: 'Access or know' },
  { value: 'correct', label: 'Correct inaccurate information' },
  { value: 'delete', label: 'Delete information' },
  { value: 'portability', label: 'Obtain a portable copy' },
  { value: 'object-or-restrict', label: 'Object to or restrict processing' },
  { value: 'withdraw-consent', label: 'Withdraw marketing consent' },
  { value: 'opt-out', label: 'Opt out of sale, sharing, or targeted advertising' },
  { value: 'appeal', label: 'Appeal a previous decision' },
  { value: 'other', label: 'Other applicable request' },
] as const

export const form = {
  legends: {
    about: 'About you',
    request: 'Your request',
  },
  labels: {
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email address',
    country: 'Country',
    stateOrProvince: 'State or province',
    relationship: 'Relationship to Hendricks',
    requestType: 'Request type',
    details: 'Request details',
    originalRequestId: 'Original request or decision reference',
    isAuthorizedAgent: 'I am submitting this request as an authorized agent for another person',
    attestation:
      'I declare that the information in this request is accurate and that I am the person identified above or am authorized to act for that person.',
  },
  hints: {
    stateOrProvince: 'Optional. Include it if your state or province determines your rights.',
    details:
      'Describe what you are asking Hendricks to do. If you are an authorized agent, include the name of the person you represent and the basis of your authority.',
    originalRequestId: 'Required only when appealing a previous decision.',
  },
  sensitiveWarning:
    'Do not include passwords, payment-card information, government identification numbers, health information, precise location information, client-confidential materials, or other sensitive personal information.',
  notice:
    'Hendricks will use the information in this form to verify, process, document, and respond to your privacy request. We may request only the additional information reasonably needed to verify the request. See our [Privacy Notice](/privacy).',
  submit: 'Submit Privacy Request',
  submitting: 'Submitting…',
} as const

export const confirmation = {
  title: 'Your request has been received.',
  body: 'Hendricks will review the request, may contact you through the email address provided if reasonable verification is required, and will respond within the period required by applicable law. Keep the confirmation number for your records.',
  referenceLabel: 'Confirmation number',
} as const

export const appeal = {
  title: 'Appealing a previous decision',
  body: 'To appeal a prior privacy-request decision, select “Appeal a previous decision,” identify the original request, and explain why you believe the decision should be reconsidered. You may also email privacy@hendricks.ai with the subject line “Privacy Appeal.”',
} as const

export const errors = {
  summaryTitle: 'Your request could not be submitted.',
  server:
    'Something went wrong while submitting your request. Please try again, or email privacy@hendricks.ai with the subject line “Privacy Request.”',
  rateLimited:
    'Too many requests have been submitted from this connection. Please wait a few minutes and try again, or email privacy@hendricks.ai.',
} as const
