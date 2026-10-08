# Initial foundation

PRODUCT_SPEC.md is the product source of truth. This pass intentionally implements only opportunity creation, document upload, and requirement review.

## Stack and architecture
Next.js App Router and TypeScript provide server-rendered UI and server actions without a separate API service. SQLite via Node 24's built-in driver provides relational persistence without infrastructure. Local private file storage is sufficient for a single-process development prototype. Migrations are versioned SQL; PostgreSQL and object storage can replace these adapters later.

UI lives in src/app, review rules in src/domain, document extraction behind src/services/parser.ts, and SQL/storage in src/persistence. Server actions validate form inputs before persistence. No credentials or external processing are required.

## Model
Organization owns users, funders, and opportunities. Opportunity progresses from draft through application, submitted, awarded, declined, and closed. SourceDocument retains uploaded bytes, filename, kind, parser identity, and opportunity association. ApplicationRequirement keeps original extracted suggestion and immutable provenance alongside editable working fields and explicit Proposed/Accepted/Rejected/Edited review state. Work status is separate. Review events record the demo reviewer, time, and before/after data.

SubmittedCommitment represents applicant promises. AwardCondition represents funder conditions; neither is automatically an active obligation. Obligation links to exactly one verified commitment or condition and carries ownership, trigger, evidence requirements, and completion status. Promotion is deferred. All derived entities retain source document, excerpt, page/section and optional confidence.

## Assumptions and boundaries
This is a local, single-organization demo with three seeded colleagues and a fixed demo reviewer, not authenticated production SaaS. Listen on localhost; do not expose sensitive documents publicly. Uploads accept PDF, DOCX, and UTF-8 text up to 10 MB. Mock extraction always returns sample suggestions, never claims to read the upload; sample provenance is explicitly synthetic and has no invented page numbers. A supplied sample text fixture lets reviewers compare suggestions with matching language. Real extraction, OCR, queues, tenancy enforcement, and production storage remain future work.

Reviewing an item confirms a human decision, not legal authority. Changes to accepted working fields become Edited and retain an audit record. Rejected items remain visible. Original parser suggestions and source excerpts are never overwritten.

## Deferred
Authentication, submission/promotion workflows, post-award UI, evidence collection, routing memory, notifications, integrations, billing, discovery, writing, and analytics. No full MVP is attempted.
