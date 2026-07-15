<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-docs -->
# Project docs (read first for domain work)

Before implementing features for this chemistry / multi-agent project, read:

1. `docs/README.md` — index and reading order
2. `docs/00-overview.md` — goals, non-goals, design invariants
3. Relevant follow-ups: `docs/01-architecture.md`, `docs/02-pipeline-and-mcp.md`, `docs/03-multi-agents.md`

Full original reflection essay (converted from PDF): `docs/sources/xtb-소감문.md`

**Invariants:** LLM must not invent numerical rankings; xTB → JSON is the single source of truth; hard-exclude on stability/safety/critic `exclude`.
<!-- END:project-docs -->
