# Data Classification Policy

## 1. Purpose

Chemidot is moving from an MVP to a professional B2B chemical marketplace.
This policy defines how information must be classified before it is stored,
accessed, displayed, logged, communicated, retained, deleted, or included in
operational evidence.

This policy protects:

- Customer, supplier, company, administrator, and support-user information.
- RFQ, quotation, offer, order, invoice, payment, and related commercial
  records.
- Chemical, quality, compliance, verification, and future private document
  workflows.
- Audit, monitoring, incident, support, and operational evidence.
- Credentials, protected configuration, and access-enabling information.

This policy does not authorize access to information, publication of a
document, customer or supplier disclosure, a role assignment, a data export,
a deployment, a migration, a schema or data change, a restore, a deletion, or
a privileged operation. Each action requires its separately approved process,
authorized role, and non-sensitive evidence where applicable.

## 2. Classification Principles

1. Classify data before storing, displaying, sharing, exporting, logging, or
   attaching it to evidence.
2. Provide only the minimum information necessary for an approved purpose.
3. Apply least privilege: access must be limited to roles with an approved
   business, operational, or review need.
4. Do not place secrets, credential values, protected configuration values, or
   access-enabling information in documentation, logs, chat, tickets,
   screenshots, dashboards, or incident evidence.
   This prohibition includes `.env` file contents.
5. Private chemical and commercial documents require controlled access; a
   document being relevant to a product or transaction does not make it public.
6. Classification applies to logging, support activity, dashboards, incident
   response, customer and supplier communication, storage, retention, and
   deletion decisions.
7. When a document or record contains data from multiple levels, handle the
   whole item at the highest applicable level unless an approved sanitized
   version is created.
8. Incident urgency does not permit bypassing classification, redaction,
   review, or controlled-access expectations.

## 3. Data Classification Levels

| Level | Definition | Examples | Access Rule | Logging Rule | Sharing Rule | Storage Expectation |
| --- | --- | --- | --- | --- | --- | --- |
| Public | Information deliberately approved for public release and safe for unrestricted viewing. | Approved marketing pages, intentionally published product/category summaries, an approved public SDS/MSDS or TDS version. | Anyone may view the approved published form. Publication approval is required before treating content as Public. | May appear in documentation or logs when approved and operationally necessary. | May be shared in its approved published form. | Approved public delivery or publication location with publication/version control as applicable. |
| Internal | Non-sensitive operational or business material that is not intended for public release. | Non-sensitive policy drafts, non-sensitive operational checklists, sanitized status summaries, internal ownership placeholders. | Chemidot personnel and approved reviewers with a business need. | May appear in operational documentation or evidence only when non-sensitive and necessary. | Share only with approved internal or contracted recipients for the stated purpose. | Controlled collaboration or operational repository with appropriate access management. |
| Confidential | Customer, supplier, commercial, or controlled-document information whose disclosure could harm a company, a transaction, trust, or operational integrity. | User account records, business contacts, RFQs, quotations, offers, orders, admin notes, audit records, COA, controlled SDS/MSDS or TDS. | Authorized users and roles only, limited to the relevant company, transaction, workflow, or approved operational responsibility. | Redacted or minimized references only; do not place raw records or document contents in logs or evidence. | Approved only, to authorized recipients for the required business or review purpose. | Authenticated, access-controlled storage; protected documents require future controlled private storage. |
| Restricted | Information that can enable access, expose highly sensitive evidence, or create severe security, financial, verification, or privacy risk if disclosed. | Supplier verification documents, invoice/payment material, private document links, credential material, secret values, database connection strings. | Strict need-to-know access through an approved secure process and accountable roles only. | Must never appear in logs, documentation, chat, screenshots, dashboards, tickets, or incident evidence. | No ordinary external sharing; use only an approved secure process where access is required and authorized. | Approved strict-access secret or private storage appropriate to the data; never ordinary documentation or log storage. |

Classification is based on the content and its approved use, not only its file
name, source system, or current visibility in the application.

## 4. Chemidot Data Examples By Category

| Data Category | Classification Decision | Handling Note |
| --- | --- | --- |
| Public marketing content | Public only when approved for publication. | Draft or unapproved material remains Internal unless it contains higher-classification information. |
| Public product/category summaries | Public only when intentionally published. | Include only approved catalogue summary content suitable for public viewing. |
| Company profile basics | Public only for approved published fields; otherwise Confidential. | Public company display information does not authorize disclosure of contact, verification, or transaction records. |
| User account data | Confidential. | Account identity, status, capability, and access-related profile information is limited to authorized workflows and roles. |
| Buyer/supplier contact data | Confidential. | Share only for approved marketplace, support, or transaction needs with authorized recipients. |
| RFQs | Confidential. | Buyer requirements, destinations, quantities, specifications, and related context are controlled commercial information. |
| Quotations/offers | Confidential. | Pricing, terms, negotiation details, validity, and supplier responses require authorized transaction access. |
| Orders | Confidential. | Order terms, fulfillment status, company involvement, and order history require authorized access. |
| Admin notes | Confidential. | Internal administrative context is not customer-facing and must not be casually disclosed. |
| Audit logs | Confidential. | Use controlled, non-sensitive evidence access; any embedded access-enabling material constitutes a Restricted exposure. |
| Supplier verification documents | Restricted. | Identity, registration, certification, and compliance-verification evidence requires strict reviewed access. |
| SDS/MSDS | Confidential by default; an approved published version may be Public. | A controlled version may be represented as available on request until publication or access is approved. |
| COA | Confidential. | A certificate of analysis should usually be provided only to authorized buyers, order participants, or approved company users. |
| TDS | Confidential by default; an approved published version may be Public. | A controlled version may be provided through a future approved document-request workflow. |
| Invoices/payments | Restricted. | Finance records and payment-related material require strict authorized handling. |
| Private document links | Restricted. | Access-enabling document links must not be placed in routine evidence or shared through uncontrolled channels. |
| API keys/secrets | Restricted. | Credential and secret material must remain in approved secret-management locations only. |
| Database connection strings | Restricted. | Connection information must not be copied into documentation, logs, chat, screenshots, or evidence. |

## 5. Classification Matrix

| Data Type | Classification Level | Who May Access | May Appear In Logs? | May Be Shared Externally? | Storage Expectation |
| --- | --- | --- | --- | --- | --- |
| Public marketing content | Public when approved | Public after publication; authorized content roles before publication | Yes, approved content only | Yes, approved published form | Approved public content location |
| Public product/category summaries | Public when intentionally published | Public after publication; authorized catalogue roles before publication | Yes, approved summary only | Yes, approved published form | Approved public catalogue delivery |
| Company profile basics | Public published fields; otherwise Confidential | Public for approved fields; company/Chemidot authorized roles otherwise | Redacted only unless already approved public content | Approved only for non-public fields | Public profile delivery for published fields; controlled storage otherwise |
| User account data | Confidential | Account owner and authorized Chemidot roles for approved duties | Redacted only | Approved only | Authenticated, access-controlled application storage |
| Buyer/supplier contact data | Confidential | Relevant authorized company users and approved support/operators | Redacted only | Approved only | Authenticated, access-controlled storage |
| RFQs | Confidential | Authorized buyer users, eligible authorized supplier users where applicable, approved Chemidot roles | Redacted only | Approved only | Authenticated, transaction-scoped storage |
| Quotations/offers | Confidential | Relevant authorized buyer/supplier users and approved Chemidot roles | Redacted only | Approved only | Authenticated, transaction-scoped storage |
| Orders | Confidential | Relevant authorized order participants and approved Chemidot roles | Redacted only | Approved only | Authenticated, transaction-scoped storage |
| Admin notes | Confidential | Authorized Chemidot admin or approved operator/reviewer roles | Redacted only | No, unless separately reviewed and required | Controlled administrative storage |
| Audit logs | Confidential; Restricted if exposure is embedded | Authorized auditors/reviewers and approved operational roles | Redacted only | Approved only, sanitized evidence | Controlled audit/evidence storage with retention controls |
| Supplier verification documents | Restricted | Approved verification reviewers and strictly authorized roles | No | Approved secure process only | Future strict-access private document storage |
| SDS/MSDS | Confidential by default; Public only for approved public version | Authorized request recipients while controlled; public for approved published version | Redacted only unless approved public version | Approved only unless public version | Future controlled private storage, or approved public version storage |
| COA | Confidential | Authorized buyers, order participants, approved company users, and approved reviewers as needed | Redacted only | Approved only | Future controlled private document storage |
| TDS | Confidential by default; Public only for approved public version | Authorized request recipients while controlled; public for approved published version | Redacted only unless approved public version | Approved only unless public version | Future controlled private storage, or approved public version storage |
| Invoices/payments | Restricted | Strictly authorized transaction, finance, or review roles | No | Approved secure process only | Strict-access commercial/finance storage |
| Private document links | Restricted | Strictly authorized recipients through an approved access process | No | No uncontrolled sharing | Future protected delivery mechanism; not routine records |
| API keys/secrets | Restricted | Strictly authorized security/operations roles only | No | No ordinary sharing | Approved secret-management location only |
| Database connection strings | Restricted | Strictly authorized operations roles only | No | No ordinary sharing | Approved protected configuration location only |

## 6. Logging And Evidence Rules By Classification

- **Public:** Approved public information may appear in documentation,
  communication, or operational evidence when its inclusion is useful and the
  published form is used.
- **Internal:** Non-sensitive Internal information may appear in operational
  documentation and evidence when it is necessary for review or accountability.
- **Confidential:** Minimize and redact Confidential information. Use safe
  identifiers, workflow labels, timestamps, counts, statuses, and sanitized
  summaries instead of raw records, document contents, contact details, or
  commercial terms.
- **Restricted:** Restricted information must never appear in logs,
  documentation, chat, screenshots, dashboards, tickets, pull requests,
  incident records, communication drafts, or copied terminal output.
- Incident evidence must reference approved secure sources or controlled
  records rather than reproduce raw sensitive content.
- If sensitive exposure is suspected, preserve a non-sensitive incident
  reference and escalate under the
  [Incident Response Runbook](./incident-response-runbook.md); do not repeat
  the exposed material in the incident record.
- These requirements complement the
  [Logging And Redaction Policy](./logging-redaction-policy.md), which governs
  operational evidence and prohibited output.

## 7. Customer And Supplier Communication Rules

- Do not disclose one customer or supplier's Confidential or Restricted data
  to another customer, supplier, or unauthorized recipient.
- Do not include internal logs, raw operational output, diagnostic traces, or
  unreviewed incident evidence in external communications.
- Do not include private document links or other access-enabling information.
- Do not provide technical exploit details, sensitive control weaknesses, or
  security-response details that have not been approved for disclosure.
- Use approved customer and supplier incident message patterns from the
  [Customer And Supplier Incident Communication Template](./customer-communication-incident-template.md).
- Sensitive, security-related, verification-related, or disclosure-sensitive
  communication requires applicable technical, business, security, or legal
  review before sending.
- Communications should contain only the minimum reviewed statement of known
  impact, status, recipient action, and non-sensitive reference required.

## 8. Access Control Expectations

This policy will feed into the future company membership and permission model.
Until that model is approved and implemented, the entries below express
required role decisions and do not grant access.

| Role Area | Expected Access Boundary | Assignment / Final Rule |
| --- | --- | --- |
| Customer users | Access only to authorized company profile and buyer workflow data, documents, and transactions. | `[customer user permission rules to confirm]` |
| Supplier users | Access only to authorized supplier profile, product, verification submission, document, offer, and order responsibilities. | `[supplier user permission rules to confirm]` |
| Company admins | Administer their company's approved users and company-scoped information without cross-company access. | `[company administrator permission rules to confirm]` |
| Chemidot admins | Perform approved platform duties under least privilege with review and evidence requirements. | `[Chemidot administrator permission rules to confirm]` |
| Support/operators | Use only minimum redacted or approved data required for support and operational duties. | `[support/operator access rules to confirm]` |
| Auditors/reviewers | Review approved controlled records and sanitized evidence for the assigned purpose only. | `[auditor/reviewer access rules to confirm]` |
| Future document access roles | Request, approve, publish, view, or audit chemical and commercial document access under future controls. | `[document access role model to confirm]` |

Company membership, delegated authority, document access approval, audit
rights, and support visibility must be finalized before professional
organization and protected-document workflows are relied on.

## 9. Document And File Handling Policy

Chemidot document handling must cover SDS/MSDS, COA, TDS, supplier
verification files, invoices, compliance documents, and other chemical or
commercial records that support a transaction or company review.

### Public Versus Controlled Documents

- A public document is a specifically approved version intended for open
  access, such as an approved public SDS/MSDS or TDS publication.
- A controlled document is not openly published and requires an authorized
  business purpose, approved recipient, and future controlled delivery.
- SDS/MSDS and TDS are Confidential by default and may become Public only when
  an approved public version exists.
- COA should usually remain Confidential and be shared only with authorized
  buyers, order participants, approved company users, or applicable approved
  reviewers.
- Supplier verification files and invoice/payment documents are Restricted.

### Controlled-By-Default Request Behavior

- Controlled-by-default chemical documents may later be represented in the UI
  as **Available on request** with a **Request** button.
- This policy does not implement a button, document request, permission check,
  approval workflow, or delivery mechanism.
- The document-request workflow will be designed later in
  `docs/chemical-document-request-workflow`.
- Unless an approved public SDS/MSDS or TDS version exists, buyers should
  obtain access through a future controlled document-request flow rather than
  an open publication path.

### Storage And Evidence Expectations

- Protected documents must not rely on uncontrolled public URLs.
- Protected document contents and access-enabling document links must not be
  copied into logs, documents, chat, screenshots, dashboards, tickets, or
  incident evidence.
- Future private storage is expected for controlled chemical, compliance,
  verification, and commercial documents before those workflows are treated
  as professionally governed.
- Future document capabilities should support versions, publication status,
  owner/company linkage, document classification, authorized retrieval,
  access-event records, and retention decisions.
- Storage implementation, document authorization, scanning, access logs, and
  publication workflow remain future approved work, not functionality granted
  by this policy.

## 10. Data Retention And Deletion Expectations

Retention and deletion periods are not yet finalized. Until approved rules
exist, classification and business-record importance must guide cautious,
reviewed handling.

| Retention Responsibility | Required Decision | Assignment / Status |
| --- | --- | --- |
| Customer and supplier record retention owner | Define retention and approved deletion rules for company and account information. | `[retention owner and period to confirm]` |
| Commercial transaction retention owner | Define retention for RFQs, quotations, orders, invoices, and payment records. | `[retention owner and period to confirm]` |
| Document retention owner | Define retention, supersession, publication, and deletion rules for chemical, verification, and compliance documents. | `[retention owner and period to confirm]` |
| Audit and incident evidence retention owner | Define accountable retention and controlled deletion for audit and incident evidence. | `[retention owner and period to confirm]` |

- Audit records, incident records, and business transaction records must not
  be deleted casually or as part of informal operational cleanup.
- Cleanup scripts are not a retention policy and must not be treated as an
  approved method for deleting business, document, audit, or incident records.
- Deletion requires an approved process, accountable owner, authorized
  execution, required evidence, and consideration of legal, commercial,
  security, and audit needs.
- Backup and restore procedures may retain or reintroduce information after a
  live-system deletion; approved retention and deletion processes must account
  for backup scope, recovery needs, and restoration implications.
- Retention evidence must remain non-sensitive and follow the classification
  and logging rules in this policy.

## 11. Data Incident Triggers

The following observations or reasonable suspicions require review and
escalation through the [Incident Response Runbook](./incident-response-runbook.md):

- Suspected exposure of a secret, credential value, protected configuration
  value, or other access-enabling information.
- A customer or supplier can see another company's Confidential or Restricted
  information without authorization.
- A private document link or controlled document is exposed through an
  uncontrolled channel.
- RFQ, quotation, offer, or order data is leaked or disclosed to an
  unauthorized recipient.
- Admin notes or controlled audit information is exposed.
- Invoice, payment, or related Restricted finance information is exposed.
- Unauthorized privileged access or an attempted unauthorized privileged
  operation is observed.

Incident response must use sanitized summaries and non-sensitive references,
not copied sensitive data or raw exposed content.

## 12. Current Known Gaps

| Gap | Required Follow-Up | Status |
| --- | --- | --- |
| Exact data owners are not assigned | Assign accountable owners for identity, commercial, document, finance, evidence, and restricted-access data. | `[status to confirm]` |
| Retention policy is not finalized | Define periods, deletion authority, preservation expectations, and backup implications by data category. | `[status to confirm]` |
| Private document storage is not implemented | Design and implement controlled private file storage only after access and retention decisions are approved. | `[future work]` |
| Company permission model is not finalized | Define company membership, role boundaries, delegated authority, and cross-company isolation. | `[future work]` |
| Document classification workflow is not implemented | Define how a document is assigned, reviewed, published, revised, and reclassified. | `[future work]` |
| Document request workflow is not implemented | Define request, approval, delivery, expiry, denial, and evidence handling for controlled documents. | `[future work]` |
| Automated secret scanning and log redaction are not yet implemented | Add approved preventive and detection controls after policy and tooling review. | `[future work]` |

## 13. Next Recommended Tasks

| Suggested Work Item | Purpose |
| --- | --- |
| `docs/company-membership-permission-model` | Define organization membership, company administration, Chemidot roles, and least-privilege access boundaries. |
| `docs/supplier-buyer-verification-model` | Define verification evidence, review ownership, decision status, and protected-data handling. |
| `docs/chemical-product-document-model` | Define chemical document types, classification, linkage, publication versions, controlled storage metadata, and audit expectations. |
| `docs/chemical-document-request-workflow` | Define controlled buyer requests, review/approval, delivery, denial, expiration, and evidence expectations for protected documents. |
| `docs/localization-arabic-plan` | Define controlled bilingual content and document/publication expectations as the product expands. |
| `ci/log-secret-scanning-checks` (later) | Add reviewed automated controls for likely sensitive-output patterns after tooling scope is approved. |
| `feature/private-file-storage-foundation` (later) | Implement controlled private document storage only after document, permission, request, retention, and evidence requirements are approved. |

This policy complements the
[Logging And Redaction Policy](./logging-redaction-policy.md), the
[Customer And Supplier Incident Communication Template](./customer-communication-incident-template.md),
the [Monitoring And Alerting Plan](./monitoring-alerting-plan.md), and the
[Incident Response Runbook](./incident-response-runbook.md). It establishes
classification decisions needed before Chemidot expands company permissions,
verification workflows, protected chemical-document handling, or private file
storage.
