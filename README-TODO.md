# TODO — Talk2MyLawyer (Lawyer Experience)

This file captures actionable TODOs derived from README-lawyers.md to guide implementation and polish.

## Verified Lawyer Profile & Compliance
- [ ] Essential Profile: name, professional title (Attorney/Advocate/Notary/Conveyancer), firm, websites
- [ ] Contact & Languages: preferred contact channels, languages supported
- [ ] Location & Service Radius: cities/provinces served or remote-only
- [ ] Identity & Compliance: ID, mobile, CIPC, VAT, BBBEE fields (and document upload placeholders)
- [ ] POPIA & Security: in-app notice confirming encryption and privacy alignment
- [ ] Document uploads: wire actual upload + storage + persistence (e.g., ID/Address/Certificates)
- [ ] Verification workflow scaffolding: structure for firm/KBA/regulator checks

## AI-Powered Client Discovery and Matching
- [ ] Edge Functions: generate semantic embeddings for lawyer profiles (areas, expertise, bios)
- [ ] Semantic search endpoint: compare client queries to embeddings
- [ ] Match indicators: display “% match” (and rationale/explanations if applicable)
- [ ] Index refresh job: keep embeddings in sync with profile updates

## Lawyer Dashboard (Practice Overview)
- [ ] Stats at a glance: Active Cases, New Clients, Monthly Earnings, Rating (connect to real data)
- [ ] Recent activity feed: messages, payment updates, scheduled consultations
- [ ] Today’s schedule: upcoming consultations and tasks
- [ ] Performance snapshot: cases completed, satisfaction, response times
- [ ] Empty states and loading skeletons

## How It Works (Lawyers) — Flow Guardrails
- [ ] Role-based signup (role=lawyer)
- [ ] Onboarding required before dashboard if profile incomplete
- [ ] Add practice areas, languages, locations (improves matching)
- [ ] Go live toggle: visibility in search
- [ ] Track activity in dashboard

## Trust, Privacy, and Compliance
- [ ] POPIA notice placement within onboarding + link to policy
- [ ] Encryption at rest/in transit (documented; ensure configs)
- [ ] Identity + right-to-practice data model; audit trail for verification actions
- [ ] RLS policies: ensure lawyers can only read/write their own profile rows

## Roadmap and Upcoming Capabilities (from README)
- [ ] Secure Messaging: centralized conversations with clients
- [ ] Document Sharing: secure file exchange and e-signature integrations
- [ ] Scheduling: calendar sync and automated availability management
- [ ] Payments & Invoicing: integrated billing, deposits, milestone tracking
- [ ] Reviews & Reputation: verified feedback
- [ ] Proposals/Engagements: scoped proposals and matter onboarding
- [ ] Team/Practice Accounts: multi-user firm management with roles

## Getting Started — Routes and UX
- [ ] Sign Up (Lawyer): /signup?role=lawyer
- [ ] Complete Onboarding: /lawyer/onboarding (autosave + final submit)
- [ ] Dashboard: /lawyer/dashboard (loads real profile; redirects if not onboarded)
- [ ] Header state: reflects authenticated role (Dashboard/Sign Out)

## Technical Notes
- [ ] Frontend: React + Vite + Tailwind CSS – ensure type safety and linting
- [ ] Supabase: Auth/Storage/Realtime/DB configured; Storage bucket for profile photos
- [ ] Edge Functions for AI matching (embeddings + search)
- [ ] Environment typing: import.meta.env types for Vite (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
- [ ] TypeScript cleanup: remove unused imports and fix type mismatches (e.g., FindLawyers)

## Support/Operational
- [ ] Contact channel for maintainers/operators
- [ ] Pilot activation checklist for messaging/documents/payments integrations

---

Notes
- This TODO list mirrors intent in README-lawyers.md. Check items off as features are implemented end-to-end (UI + backend + policies).
- Consider splitting into NOW / NEXT / LATER for prioritization once scoping is agreed.

