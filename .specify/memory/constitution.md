<!-- Sync Impact Report
- Version change: 0.0.0 → 1.0.0
- Modified principles: none (initial constitution drafting)
- Added sections: Additional Constraints, Development Workflow, Governance
- Removed sections: none
- Follow-up TODOs: none
-->

# Primeiro SDD Constitution

## Core Principles

### I. Requirement Clarity
Every change MUST begin with a clear description of the problem, the expected behavior, and the acceptance criteria. If the requirement is ambiguous, the team MUST resolve it before implementation begins. This prevents rework and keeps development aligned with user intent.

### II. Test-First Delivery
Work MUST follow a red-green-refactor cycle: write or update the relevant test first, confirm it fails for the right reason, implement the minimum change, and verify the result. Production code without a corresponding test is considered incomplete.

### III. Small, Reviewable Changes
Changes MUST be kept small enough to review, reason about, and revert safely. A single change should address one clearly defined concern, and large or cross-cutting work MUST be split into smaller steps with explicit boundaries.

### IV. Maintainable Design
Code and configuration MUST favor clarity over cleverness. Names, structure, and comments MUST make intent obvious, and shortcuts that obscure behavior are not allowed unless they are documented and justified.

### V. Evidence Over Assumption
Decisions, fixes, and releases MUST be backed by verified evidence such as tests, logs, build output, or user-facing validation. Claims without verification are not accepted as completion.

## Additional Constraints

The repository MUST remain reproducible and safe to work in:
- No secrets, credentials, or local environment values MAY be committed.
- New dependencies or infrastructure changes MUST be justified in the related spec or plan.
- Documentation MUST be updated when behavior, workflows, or interfaces change.
- The default branch MUST remain deployable and free of known blocking issues.

## Development Workflow

All work MUST follow the project workflow:
1. Capture the need in a feature spec with clear acceptance criteria.
2. Create or update the implementation plan before coding.
3. Break the work into small tasks and verify each step.
4. Run relevant tests and checks before considering the work complete.
5. Record the result in the repository history with clear, reviewable changes.

## Governance

This constitution supersedes informal shortcuts and personal preferences for this repository. Any amendment requires a documented rationale, a review of impact on existing practices, and agreement from the maintainers before it becomes effective. Changes to this constitution MUST be versioned, dated, and reflected in the project documentation.

Compliance with this constitution is mandatory for all contributors. Reviews MUST verify that new work follows these principles, and violations MUST be corrected before the change is accepted.

**Version**: 1.0.0 | **Ratified**: 2026-07-31 | **Last Amended**: 2026-07-31
