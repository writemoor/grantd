# PRODUCT_SPEC.md

## Product Working Title
Grant Operations Workspace

## Product Summary

A lightweight grant operations workspace for small and midsize nonprofits.

The product helps nonprofit teams coordinate grants across the full lifecycle without trying to become a full grant-management suite, CRM, accounting system, or proposal-writing platform.

The core value proposition is:

> **Upload a grant application and know what your organization needs to provide. Upload an award and know what your organization needs to deliver.**

The product acts as a coordination and obligation layer around the tools nonprofit teams already use.

---

## Target Customer

Primary target:

- Small and midsize nonprofits
- Roughly $1M–$25M in annual revenue
- Roughly 5–75 employees
- Multiple active grants
- No dedicated grants-compliance operation
- Development teams that rely on spreadsheets, email, shared drives, calendars, and staff memory

Likely organization types:

- Performing arts organizations
- Museums
- Human-services nonprofits
- Educational nonprofits
- Community organizations
- Cultural institutions
- Other mission-driven organizations with recurring foundation, corporate, or government grants

Likely users:

- Development Directors
- Grant Managers
- Institutional Giving staff
- Finance leaders
- Program leaders
- Executive Directors
- HR / People staff
- Operations staff

---

## Core Problem

Grant administration frequently depends on fragmented workflows.

Before an award:

- Development receives an application, RFP, or guidelines document.
- Someone must read it closely and determine what information is required.
- Questions often require input from Finance, HR, Programs, Executive Leadership, Governance, Communications, or other departments.
- Requests are routed manually through email, Slack, meetings, spreadsheets, or memory.
- Teams repeat the same questions across many funders.
- Information can arrive late, incomplete, out of date, or in the wrong format.
- Requirements can be buried in instructions, appendices, portal guidance, or attachments.

After an award:

- Important obligations are buried in award letters, agreements, standard terms, budgets, applications, amendments, and reporting instructions.
- Reporting deadlines are manually copied into spreadsheets or calendars.
- Program commitments made during the application phase may not be visible to the teams responsible for delivering them.
- Spending restrictions, notification requirements, acknowledgment rules, and evidence requirements can be forgotten.
- Supporting documentation is scattered across folders and systems.
- Institutional knowledge often lives with one person.

The product should answer four post-award questions clearly:

1. **What do we owe?**
2. **Who owns it?**
3. **When does it matter?**
4. **Can we prove we did it?**

---

# Product Principles

## 1. Coordination, not proposal writing

The product should not initially position itself as an AI grant-writing tool.

Positioning:

> **We help your organization coordinate grants.**

The system may eventually assist with reuse of prior answers or drafting, but that is not the initial wedge.

## 2. Human verification is required

AI output should not be presented as infallible.

The system identifies likely requirements, commitments, owners, and obligations. A human user confirms or edits them before they become authoritative records.

Suggested language:

> “We found this.”

Avoid:

> “This is definitely your legal/compliance requirement.”

## 3. Traceability is essential

Every AI-derived requirement or obligation should link back to its original source language.

Users should be able to see:

- Source document
- Page or section
- Exact or highlighted source text
- Confidence level where appropriate

## 4. Do not replace existing document systems

The product should not require nonprofits to migrate all files into a new repository.

Users should be able to:

- Upload documents
- Attach evidence
- Link to Google Drive
- Link to Dropbox
- Link to SharePoint
- Link to another document repository

The application should be the **coordination and obligation layer**, not a replacement for the user's existing document infrastructure.

## 5. Stay lightweight

The initial product should solve a narrow operational problem extremely well.

Avoid premature expansion into:

- CRM
- Accounting
- Grant discovery
- Donor management
- Foundation-side grantmaking
- Full project management
- Enterprise compliance tooling

---

# High-Level Grant Lifecycle

Data model concept:

**Funder**
→ **Opportunity**
→ **Application**
→ **Application Requirements**
→ **Internal Inputs**
→ **Submitted Commitments**
→ **Award**
→ **Award Conditions**
→ **Active Obligations**
→ **Evidence / Completion**
→ **Reporting / Closeout**

Not every object needs to exist in the earliest build, but the architecture should leave room for this lifecycle.

---

# PRE-AWARD WORKFLOW

## Goal

Turn an unstructured application or guidelines document into a structured internal work plan.

## Input

User uploads one or more of:

- Grant application PDF
- RFP
- Application guidelines
- Funder instructions
- Portal-exported application
- Required attachments list
- Narrative questions document

## AI Parsing

The system analyzes the document and extracts application requirements.

Possible categories:

- Narrative response
- Financial data
- Organizational data
- Program data
- Outcome metrics
- Workforce / HR data
- Policy or compliance information
- Board / governance information
- Existing document
- Required attachment
- Signature / approval
- Certification
- Program budget
- Organizational budget
- Audit or financial statement
- Supporting material

## Suggested Internal Routing

The system proposes the department most likely to provide each item.

Initial routing categories might include:

- Development
- Finance
- HR / People
- Programs
- Executive Leadership
- Governance / Board Relations
- Communications / Marketing
- Operations
- Legal / Compliance
- IT / Security
- Other

Example:

| Application Item | Information Needed | Suggested Owner |
|---|---|---|
| Current organizational budget | Current-year budget and prior-year actuals | Finance |
| Employee retention data | Turnover / retention metrics | HR / People |
| Board roster | Names, affiliations, terms | Governance |
| Prior-year program outcomes | Participant and outcome metrics | Programs |
| Project budget | Revenue and expense assumptions | Finance + Programs |
| DEI policy | Relevant organizational policy | HR / Leadership |

## User Review

The user can:

- Accept extracted requirement
- Edit extracted requirement
- Reject extracted requirement
- Change category
- Change department
- Assign a specific owner
- Add a due date
- Add notes
- Mark as already available
- Mark as waiting on someone
- Mark as complete

## Organization Learning

When a user corrects routing, the application should remember organization-specific preferences.

Examples:

- “Employee demographics” → People & Culture
- “Board composition” → Board Relations
- “Project budget” → Director of Finance

This should gradually improve routing without requiring extensive configuration.

## Initial Output

A structured application checklist.

The checklist should answer:

- What is required?
- What type of information is it?
- Which department likely owns it?
- Who is responsible?
- Is it already available?
- Is it outstanding?
- When is it needed?

---

# PRE-AWARD: FUTURE WORKFLOW AUTOMATION

Not required for initial MVP, but likely future expansion.

Potential workflow:

1. AI identifies requirement.
2. Development assigns owner.
3. System sends request through:
   - Email
   - Slack
   - Teams
   - In-app task
4. Recipient receives the exact request plus useful context.
5. Recipient can:
   - Enter information
   - Upload a document
   - Link to a file
   - Send a response back to Development
6. Development reviews and incorporates the response.

Important future design question:

Should non-Development contributors need full user accounts?

Prefer minimizing adoption friction.

Potential direction:

- Secure one-time request links
- Email-based responses
- Lightweight contributor access

---

# APPLICATION SUBMISSION

When an application is submitted, preserve:

- Final application
- Narrative responses
- Budgets
- Attachments
- Metrics
- Program promises
- Staffing assumptions
- Other representations made to the funder

These should become source documents for the grant record.

The application should not disappear into an archive after submission.

---

# SUBMITTED COMMITMENTS

After submission, the system should eventually identify promises made by the nonprofit.

Examples:

- Serve 250 participants
- Conduct six workshops
- Maintain a specific staffing model
- Track demographic data
- Provide free programming
- Spend no more than a specified amount on equipment
- Deliver specific evaluation activities

These are:

> **Application Commitments**

Definition:

Things the nonprofit said it would do.

Application commitments should remain distinct from award conditions.

---

# POST-AWARD WORKFLOW

## Goal

Turn award documents into a verified obligation register.

## Input

User uploads one or more:

- Award letter
- Grant agreement
- Standard terms
- Approved budget
- Amendment
- Funder email
- Reporting instructions
- Revised scope
- Other governing documents

## AI Extraction

The system identifies potential obligations.

Possible categories:

### Reporting
- Interim narrative report
- Final report
- Financial report
- Progress report

### Financial
- Restricted uses
- Spending caps
- Matching requirements
- Budget reallocation thresholds
- Prior-approval requirements

### Program
- Participant targets
- Deliverables
- Service levels
- Program milestones

### Communications
- Logo usage
- Funder acknowledgment
- Publicity requirements
- Press-release requirements

### Documentation
- Record retention
- Attendance records
- Receipts
- Supporting documentation

### Notification
- Leadership changes
- Material program changes
- Litigation
- Organizational status changes
- Budget changes

### Compliance
- Insurance requirements
- Nonprofit status
- Certifications
- Policy requirements

### Closeout
- Final report
- Remaining funds
- Asset disposition
- Record retention

---

# HUMAN VERIFICATION

Before an extracted item becomes an active obligation, the user should be able to:

- Accept
- Edit
- Reject
- Assign owner
- Add due date
- Add trigger
- Add evidence requirement
- Add notes
- Change category
- Mark applicability

No extracted obligation should silently become authoritative without user review.

---

# APPLICATION COMMITMENTS VS AWARD CONDITIONS

The system should explicitly distinguish:

## Application Commitments

Things the nonprofit said it would do.

Examples:

- Serve 200 youth
- Conduct quarterly workshops
- Hire a program coordinator
- Track participant outcomes

## Award Conditions

Things the funder explicitly requires.

Examples:

- Final report due within 60 days
- Budget changes above 10% require approval
- Foundation acknowledgment required
- Maintain insurance coverage

Relevant application commitments may be promoted into active post-award obligations.

Future capability:

Compare application commitments against award terms and show which promises remain relevant.

---

# ACTIVE GRANT MANAGEMENT

Each active obligation should include:

- Requirement
- Category
- Owner
- Department
- Due date
- Trigger
- Status
- Evidence requirement
- Evidence link or attachment
- Source document
- Source location
- Source language
- Notes

Suggested statuses:

- Not started
- In progress
- Waiting
- Ready
- Complete
- Not applicable

---

# DASHBOARD CONCEPT

Example:

## Mellon Foundation — Youth Music Initiative
$125,000

- 9 open obligations
- 2 due in next 60 days
- 1 obligation missing an owner
- 1 obligation missing required evidence

The dashboard should prioritize risk and action rather than visual complexity.

Possible alerts:

- Report due soon
- Obligation overdue
- Missing owner
- Missing evidence
- Grant ending with incomplete obligations
- Trigger-based requirement needs review

---

# REPORTING AND CLOSEOUT

The grant record should eventually provide:

- Upcoming obligations
- Completed obligations
- Missing evidence
- Reporting requirements
- Application commitments
- Award conditions
- Source documentation
- Grant history
- Closeout checklist

Potential future output:

A downloadable or exportable compliance packet showing:

- Obligations
- Completion status
- Evidence
- Source language
- Activity history

---

# MVP FEATURES

## Must Have

### Pre-Award
- User authentication
- Organization workspace
- Create grant opportunity
- Upload application PDF/document
- AI parsing
- Requirement extraction
- Requirement categorization
- Suggested department routing
- Human review / correction
- Owner assignment
- Due dates
- Status
- Structured checklist

### Submission
- Mark application as submitted
- Preserve source documents
- Preserve final application materials
- Store structured commitments

### Post-Award
- Convert opportunity to awarded grant
- Upload award document
- AI obligation extraction
- Obligation categorization
- Human verification
- Owner assignment
- Deadlines / triggers
- Status
- Evidence link / attachment
- Source traceability

### General
- Grant list
- Grant detail page
- Search
- Basic notifications/reminders
- Basic role-based permissions
- Activity history

---

# MVP: NICE TO HAVE

Only after core workflows work well:

- Multiple source documents per grant
- Cross-document extraction
- Organization-specific routing memory
- Bulk requirement editing
- Calendar export
- CSV export
- Basic reporting
- Email notifications
- Duplicate requirement detection

---

# OUT OF SCOPE FOR INITIAL MVP

Do not initially build:

- Grant prospecting
- Funder discovery database
- AI proposal writing
- Donor CRM
- Full accounting
- Full budget management
- Expense approvals
- Reimbursement management
- Fund accounting
- Outcomes dashboards
- Sophisticated analytics
- Foundation-side grantmaking
- Board reporting platform
- Donor management
- Full document-management system
- Complex approval chains
- Full project-management replacement

---

# CORE USER EXPERIENCE

The experience should feel simple enough that a nonprofit Development Director can understand it immediately.

## Pre-Award

**Upload application**
↓
**AI identifies requirements**
↓
**System suggests departments / owners**
↓
**Development reviews**
↓
**Structured checklist**
↓
**Collect missing information**
↓
**Submit application**
↓
**Preserve commitments**

## Post-Award

**Upload award**
↓
**AI identifies conditions**
↓
**Compare against application commitments**
↓
**Human verifies**
↓
**Assign owners / deadlines / evidence**
↓
**Track obligations**
↓
**Complete reporting**
↓
**Close grant**

---

# PRODUCT POSITIONING

Avoid:

> AI grant writer

Avoid:

> Enterprise grant management system

Avoid:

> CRM for nonprofits

Prefer:

> Grant operations workspace

Possible positioning language:

> **We help nonprofit teams coordinate grants from application through award and closeout.**

Primary message:

> **Upload a grant application and know what your organization needs to provide. Upload an award and know what your organization needs to deliver.**

Alternative:

> **Know what the funder needs. Know who needs to provide it. Know what you promised. Know what comes next.**

---

# KEY DIFFERENTIATION

The initial differentiation hypothesis is:

1. Lightweight enough for small and midsize nonprofits
2. AI-first document parsing
3. Pre-award internal requirement routing
4. Post-award obligation extraction
5. Connection between application promises and award obligations
6. Human verification
7. Source traceability
8. Works alongside existing tools rather than replacing them
9. Focus on coordination rather than proposal writing

---

# COMPETITIVE CONTEXT

Important competitors and adjacent products include:

- Instrumentl
- GrantConsole
- Fluxx Grantseeker
- Euna / AmpliFund
- Grantable
- Airtable
- Monday.com
- Asana
- Spreadsheets + email + shared drives

Strategic observation:

Instrumentl provides extensive lifecycle functionality, including AI-assisted award-document extraction, but is positioned as a broad grants platform and is substantially more expensive.

GrantConsole focuses heavily on post-award grant operations but, based on current public positioning, requires obligations to be entered rather than automatically reading award documents.

The opportunity should not depend solely on “AI reads awards.”

The stronger wedge is:

> **AI-assisted coordination across both the application and post-award lifecycle for smaller nonprofit teams.**

---

# CUSTOMER DISCOVERY: PRE-AWARD QUESTIONS

Use these questions with Development teams.

1. Walk me through the last grant application your team completed, starting when you first received the application or guidelines.

2. What do you do first when you receive a new application?

3. How do you identify everything that has to be submitted?

4. How do you determine which questions Development can answer itself and which require another department?

5. Which departments do you most commonly need information from?

6. What kinds of information are consistently difficult to obtain?

7. Walk me through what happens when you need information from Finance, HR, Programs, or another department.

8. How much context do you need to give someone before they understand what you are asking for?

9. Do you send colleagues the exact funder question or translate it into a different request? Why?

10. How often does the first response you receive fail to fully answer the application question?

11. Tell me about the last time there was substantial back-and-forth getting information for an application.

12. How do you track outstanding requests to other departments?

13. Have you had an application delayed, rushed, or weakened because information came in late?

14. Are there questions that recur across funders?

15. When the same information is requested again, how do you find the previous answer?

16. Do you maintain a library of commonly requested organizational information or attachments?

17. How do you handle version control when several people contribute?

18. Who ultimately owns ensuring the application is complete?

19. What typically consumes the most time: writing, gathering information, coordinating people, approvals, or something else?

20. What part of the application process feels like administrative work that should require less human effort?

21. Do instructions bury requirements outside the actual application questions?

22. Have you discovered a missing document, approval, statistic, or attachment late in the process?

23. How do you handle questions requiring input from multiple departments?

24. Who converts internal information into funder-ready language?

25. How do you confirm that information supplied by another department is current and uses the correct reporting period?

26. What happens to all the information gathered after the application is submitted?

27. When a grant is awarded, how do responsible teams learn what was promised?

28. Have Program, Finance, HR, or leadership ever been unaware of commitments made in an application?

29. If software automatically broke an application into requirements and suggested an internal owner, what would be useful about that?

30. What would make you distrust that analysis?

31. Would you want software only to organize requests, or eventually send requests to colleagues?

32. If requests were sent automatically, how should that work?

33. Should contributors need accounts, or should they be able to respond through lightweight links/email?

34. What would make another grant-related tool feel like more trouble than it is worth?

35. If you could eliminate one frustrating step from the application process tomorrow, what would it be?

---

# CUSTOMER DISCOVERY: POST-AWARD QUESTIONS

1. Walk me through the last grant your organization received, starting when you were notified.

2. What happens to the award letter or agreement once it arrives?

3. How do you identify everything the organization is required to do?

4. Where are deadlines, deliverables, restrictions, and requirements recorded?

5. Who is responsible for keeping track of them?

6. How do Program and Finance teams know what they need to provide?

7. Tell me about the last time a grant requirement surprised you late in the process.

8. Have you ever missed or nearly missed a report, deliverable, acknowledgment, approval, or spending restriction?

9. When preparing a report, how much effort goes into finding supporting documentation?

10. How many active grants are you typically managing?

11. What software do you currently use?

12. What have you built yourselves to compensate for missing functionality?

13. What is the most annoying or risky part of post-award administration?

14. If software could read a grant agreement and propose requirements, how useful would that be?

15. What would make you trust or distrust that capability?

---

# CUSTOMER DISCOVERY: WHAT TO LISTEN FOR

Strong signals:

- “I copy this into a spreadsheet.”
- “I have a folder for these.”
- “I put reminders on my calendar.”
- “We have our own template.”
- “We just have to remember.”
- “I check the portal every few days.”
- “One person knows all of this.”
- “I email Finance every time.”
- “We always have to chase people.”
- “We nearly missed it.”
- “Program didn't know we promised that.”
- “I have to reread the whole application.”
- “I know we answered this before but I can't find it.”

Weak signals:

- Existing software already solves the workflow well
- Very low grant volume
- Little cross-department coordination
- Post-award requirements are simple and rare
- Users see no meaningful cost to current workflow

---

# OPEN PRODUCT QUESTIONS

Customer discovery should resolve these before major scope expansion.

## Pre-Award

- Is the main pain finding the answer?
- Finding the person who owns the answer?
- Getting that person to respond?
- Turning internal information into funder-ready language?
- Tracking all outstanding pieces?

## Post-Award

- Is obligation extraction itself painful enough to justify a product?
- Or is the harder problem getting departments to fulfill obligations?
- How frequently are requirements missed?
- How serious are the consequences?
- What degree of automation will users trust?

## Collaboration

- Should contributors need accounts?
- Can requests be completed via secure external links?
- Is email sufficient?
- Is Slack important?
- Is Teams more important in certain segments?

## Documents

- How many documents typically govern a single grant?
- How often does the original application become legally or operationally relevant?
- How common are amendments?
- How often do funder portal instructions matter?

## Pricing

Do not assume pricing until customer discovery.

Test willingness to pay relative to:

- Number of active grants
- Number of users
- Annual grant revenue
- Organization size
- Risk avoided
- Staff time saved

---

# BUILD PHILOSOPHY

When making implementation decisions, prefer:

- Simple
- Explainable
- Auditable
- Reversible
- Low-friction
- Human-confirmed

Avoid building speculative complexity.

Every feature should answer:

> Does this make it easier for a nonprofit team to understand, coordinate, or fulfill a grant requirement?

If not, it probably does not belong in the initial product.

---

# CURRENT WORKING THESIS

The strongest current hypothesis is:

> **Small and midsize nonprofits need a lightweight system that converts unstructured grant documents into structured, human-verified work—first by identifying what an application requires and who needs to provide it, then by preserving what the organization promised and converting award documents into trackable obligations.**

The product's advantage is not merely AI document extraction.

It is the continuity between:

**What the funder asks**
→ **Who inside the nonprofit needs to respond**
→ **What the nonprofit promises**
→ **What the award requires**
→ **Who must deliver**
→ **What proves completion**

That lifecycle continuity should guide future product decisions.
