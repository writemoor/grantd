# Grant Operations Workspace

A small pre-award vertical slice based on [PRODUCT_SPEC.md](PRODUCT_SPEC.md). See [architecture and scope](docs/ARCHITECTURE.md).

## Run locally
Requires Node.js 24+ and npm.

```sh
npm ci
npm run db:init
npm run dev
```

Open http://127.0.0.1:3000. Create an opportunity, upload `fixtures/sample-guidelines.txt` (or a PDF/DOCX/TXT), then accept, reject, or edit each suggestion. Edit controls include category, department, owner, due date, work status, and notes. Source files can be downloaded; original suggestions and synthetic excerpts remain visible after edits. Changes persist across restarts.

**This is an unauthenticated local demo.** It uses a fixed demo organization/reviewer and three seeded colleagues. The mock parser does not analyze uploads. All extracted items and their source excerpts are labeled synthetic; they must not be used as real application advice. No AI credentials are required. Do not deploy publicly or upload sensitive data before authentication and tenancy controls are implemented.

SQLite and private uploads live in ignored `data/`. Set `GRANTD_DATA_DIR` to an absolute path to relocate both. Back up the database and uploads together. Schema v1 initializes idempotently; future changes should introduce explicit migrations. Node's built-in SQLite driver may emit an experimental warning.

```sh
npm run test
npm run typecheck
npm run build
npm start
```

The schema includes submitted commitments, awards, award conditions, and verified obligations, but this pass provides no submission or post-award UI. Obligations must reference exactly one human-verified commitment or condition.

Next priorities: authentication and tenant isolation; real parser with source-grounded extraction; richer document validation and durable storage; submission and award verification workflow; browser coverage and reviewer concurrency safeguards.

The HTTP smoke test exercises real server-action forms and file downloads. Run a separate development server with a disposable data directory, then `npm run test:http` (set `SMOKE_BASE_URL` if using another port). It creates test opportunities; do not point it at important data.

Validation for this initial slice: three domain/database tests passed; TypeScript and production build passed; HTTP create/upload/download/accept/edit/reject smoke passed; production dependency audit reported no vulnerabilities. Browser interaction/visual tests and production deployment are not yet covered.
