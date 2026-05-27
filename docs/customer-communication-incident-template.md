# Customer And Supplier Incident Communication Template

## 1. Purpose

Chemidot is moving from an MVP to a professional B2B chemical marketplace.
This document defines safe, consistent templates for communications to
customers, suppliers, and internal business stakeholders during incidents or
applicable planned maintenance.

This document protects:

- Customer and supplier trust through clear, calm, timely communication.
- Customer, supplier, administrator, RFQ, quotation, order, and related
  marketplace information.
- Operational evidence, incident handling, and future controlled chemical and
  commercial document workflows.
- Credentials, protected configuration, and access-enabling information from
  inappropriate disclosure.

This document does not authorize sending a message, confirming an incident,
disclosing an impact, announcing a root cause, deploying an application
change, changing data or schema, restoring data, executing a privileged
operation, granting access, or rotating credentials. Communications and any
operational response require the applicable approved owner, reviewer, and
procedure.

## 2. Communication Principles

1. Be clear and calm: describe known customer or supplier impact in plain
   language without creating unnecessary alarm.
2. Do not overpromise resolution timing, recovery outcomes, or future
   prevention.
3. Do not expose secrets, credentials, protected configuration, or
   access-enabling information.
4. Do not share internal logs, raw operational output, or unreviewed
   diagnostic details.
5. Do not blame customers or suppliers for reported symptoms or incident
   impact.
6. Do not speculate on root cause before it has been confirmed and approved
   for communication.
7. Communication requires an approved communications owner and applicable
   reviewer before it is issued.
8. Use only the minimum non-sensitive information necessary to communicate
   status, impact, actions available to recipients, and the next update.

## 3. When To Communicate

Use these templates only after the applicable communication decision and
approval have been made under the incident or operational process.

| Situation | Communication Consideration |
| --- | --- |
| Production outage | Communicate customer or supplier service unavailability when impact is confirmed or communication is directed by the incident owner. |
| Login or access issue | Communicate inability to access expected workflows without exposing account, session, or authentication detail. |
| RFQ or order workflow issue | Communicate confirmed disruption or delay to core marketplace workflow activity using non-sensitive descriptions. |
| Supplier or administrator workflow issue | Communicate supplier-facing impact where appropriate; administrator detail remains internal and non-sensitive. |
| Confirmed customer-facing data issue | Coordinate reviewed communication describing known customer impact without including sensitive records or unapproved technical detail. |
| Security or secret exposure concern | Do not communicate externally until security and required review determine the approved notification approach. |
| Planned maintenance, if applicable | Provide advance notice only when the maintenance and communication have been approved. |
| Incident resolved notice | Notify affected audiences after resolution is confirmed and the message is reviewed. |

## 4. Communication Approval Roles

Assign communication responsibilities through the approved incident process.
Use role placeholders only; do not record personal contact details here.

| Role | Communication Responsibility | Assignment |
| --- | --- | --- |
| Incident commander | Confirms incident status, severity, affected audience, and communication decision. | `[incident commander role to confirm]` |
| Communications owner | Drafts, coordinates, sends, and records approved messages. | `[communications owner role to confirm]` |
| Technical reviewer | Confirms that impact and status statements are accurate and non-sensitive. | `[technical reviewer role to confirm]` |
| Business owner | Confirms customer and supplier business context and audience suitability. | `[business owner role to confirm]` |
| Legal/security reviewer, if needed | Reviews security-sensitive, disclosure-sensitive, or regulatory communication concerns. | `[legal/security reviewer role to confirm if needed]` |
| Customer support owner | Coordinates approved incoming support handling and follow-up messaging. | `[customer support owner role to confirm]` |

## 5. Message Safety Rules

Every incident or maintenance message, draft, approval record, and
communication log must follow these rules:

- Include no secret values or credential material.
- Include no database connection URLs or full connection strings.
- Include no tokens, passwords, private keys, session values, or reset
  values.
- Include no raw logs or copied operational output.
- Include no internal stack traces or unreviewed technical diagnostics.
- Include no sensitive customer or supplier data.
- Include no private document links or access-enabling resource details.
- Use only a non-sensitive incident reference, such as
  `[non-sensitive incident reference]`.
- Include only reviewed statements about known impact, current status, and
  approved next steps.

## 6. Initial Incident Acknowledgement Template

Use an initial acknowledgement after customer or supplier impact is known
enough to communicate and the message is approved. Do not state an
unconfirmed cause or unapproved resolution estimate.

### Customer-Facing Message

```markdown
Subject: Chemidot service issue update - [non-sensitive incident reference]

Hello,

We are aware of an issue affecting [affected customer-facing workflow or
service] beginning at approximately [timestamp and timezone].

Our team is investigating the issue. We will provide another update by
[next update time and timezone] or sooner if material new information is
confirmed.

If you need assistance in the meantime, please use [approved support channel
placeholder].

Reference: [non-sensitive incident reference]
```

### Supplier-Facing Message

```markdown
Subject: Chemidot supplier workflow issue update - [non-sensitive incident reference]

Hello,

We are aware of an issue affecting [affected supplier-facing workflow or
service] beginning at approximately [timestamp and timezone].

Our team is investigating the issue. We will provide another update by
[next update time and timezone] or sooner if material new information is
confirmed.

For approved supplier support, please use [approved supplier support channel
placeholder].

Reference: [non-sensitive incident reference]
```

### Internal Business Update

```markdown
Subject: Incident business update - [non-sensitive incident reference]

- Status: Investigating
- Started/observed: [timestamp and timezone]
- Confirmed affected audience: [customer / supplier / both / pending confirmation]
- Confirmed affected workflow: [non-sensitive workflow description]
- Customer or supplier message decision: [approved / pending review / not required at this stage]
- Next update expected: [timestamp and timezone]
- Incident commander: [role placeholder]
- Communications owner: [role placeholder]
- Review status: [technical/business/security review status as applicable]

Do not forward outside the approved audience without communication owner review.
```

## 7. Status Update Template

Use the applicable approved status message below. Replace bracketed fields
only with reviewed, non-sensitive information.

### Still Investigating

```markdown
Subject: Chemidot incident update - [non-sensitive incident reference]

We are continuing to investigate an issue affecting [affected workflow or
service]. The issue began at approximately [timestamp and timezone] and
remains under investigation.

We will provide another update by [next update time and timezone].

Reference: [non-sensitive incident reference]
```

### Issue Identified

```markdown
Subject: Chemidot incident update - [non-sensitive incident reference]

We have identified the issue affecting [affected workflow or service] and are
working on the approved next steps to restore normal service.

We will provide another update by [next update time and timezone].

Reference: [non-sensitive incident reference]
```

### Mitigation In Progress

```markdown
Subject: Chemidot incident update - [non-sensitive incident reference]

Mitigation is in progress for the issue affecting [affected workflow or
service]. We are validating service status and will confirm resolution once
the required checks are complete.

We will provide another update by [next update time and timezone].

Reference: [non-sensitive incident reference]
```

### Workaround Available, If Applicable

```markdown
Subject: Chemidot incident update and approved workaround - [non-sensitive incident reference]

The issue affecting [affected workflow or service] is still being addressed.
An approved temporary workaround is available: [approved non-sensitive
workaround instruction].

Please do not include sensitive business, account, or document information in
support communications beyond the approved support process.

We will provide another update by [next update time and timezone].

Reference: [non-sensitive incident reference]
```

## 8. Resolution Notice Template

Send a resolution notice only after resolution and customer/supplier
communication have been approved. Keep technical detail limited to what the
audience needs to know.

```markdown
Subject: Chemidot service issue resolved - [non-sensitive incident reference]

Hello,

The issue affecting [affected workflow or service] has been resolved as of
[resolution timestamp and timezone].

Affected period: [impact start timestamp and timezone] to [resolution
timestamp and timezone].

What was affected: [approved plain-language impact summary].

If you are still experiencing an issue with [affected workflow or service],
please contact us through [approved support channel placeholder] and include
reference [non-sensitive incident reference].

We appreciate your patience while this issue was addressed.
```

## 9. Post-Incident Follow-Up Template

Use this follow-up only when an approved customer or supplier summary is
appropriate. Do not include unapproved root cause details or internal
diagnostic material.

```markdown
Subject: Follow-up on Chemidot incident - [non-sensitive incident reference]

Hello,

Summary: [approved plain-language incident summary without unapproved root
cause detail].

Impact window: [impact start timestamp and timezone] to [impact end timestamp
and timezone].

Customer or supplier impact: [approved non-sensitive description of affected
service or workflow].

What was improved: [approved non-sensitive improvement or follow-up summary].

For questions or assistance, please use [approved support contact/channel
placeholder].

Reference: [non-sensitive incident reference]
```

## 10. Security-Sensitive Communication Rules

- A suspected exposure of secrets, credentials, protected configuration, or
  access-enabling information requires security review before external
  communication is sent.
- Do not disclose exploit details, suspected attack methods, or investigation
  specifics that have not been approved for communication.
- Do not share indicators or operational details that could assist attackers
  or enable further unauthorized access.
- Coordinate customer or supplier notification through the incident
  commander, communications owner, and legal/security reviewer when needed.
- Preserve evidence through the approved incident process without copying
  sensitive material into communication drafts or communication logs.
- Rotate or revoke affected credentials only through the approved security or
  incident process; a communication template does not authorize that action.

## 11. Communication Log Template

Copy this log template into the approved non-sensitive incident evidence
location for each issued communication. Do not attach raw messages containing
sensitive content or any access-enabling details.

```markdown
# Incident Communication Log Entry

- Incident reference: [non-sensitive incident reference]
- Audience: [customers / suppliers / internal business / other approved audience]
- Message type: [initial acknowledgement / status update / resolution notice / post-incident follow-up / planned maintenance]
- Approver: [approver role placeholder]
- Sent by: [communications owner role placeholder]
- Sent time: [timestamp and timezone]
- Channel: [approved channel label placeholder]
- Message summary: [non-sensitive approved summary]
- Follow-up required: [yes/no and non-sensitive follow-up reference if applicable]

No secret, credential, sensitive-record, private-link, or access-enabling
information is recorded in this entry.
```

## 12. Current Known Gaps

- Communication owner has not yet been assigned.
- Customer support channel has not yet been confirmed.
- Supplier communication channel has not yet been confirmed.
- Legal/security review process has not yet been finalized.
- Public status page has not yet been confirmed.
- Arabic communication templates have not yet been created.

## 13. Next Recommended Tasks

| Suggested Work Item | Purpose |
| --- | --- |
| `docs/data-classification-policy` | Define handling expectations for customer, supplier, incident, operational, and future protected-document information. |
| `docs/company-membership-permission-model` | Define organization roles and authorization expectations relevant to access and incident communication. |
| `docs/localization-arabic-plan` | Establish approved Arabic-language communication coverage and review requirements. |
| `docs/customer-support-operating-model` | Define support ownership, approved channels, triage, escalation, and customer/supplier follow-up handling. |
| `ci/migration-file-safety-checks` (later) | Extend repository safety controls for migration artifacts once controlled migration execution requirements are finalized. |

This document complements the [Incident Response Runbook](./incident-response-runbook.md),
the [Monitoring And Alerting Plan](./monitoring-alerting-plan.md), the
[Monitoring Dashboard Checklist](./monitoring-dashboard-checklist.md), and
the [Logging And Redaction Policy](./logging-redaction-policy.md). It provides
safe communication wording and evidence structure while leaving incident
decisions, approvals, and operational actions to their governing procedures.
