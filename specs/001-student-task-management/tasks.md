# Tasks: Gerenciamento de Tarefas de Alunos

**Input**: Design documents from `/specs/001-student-task-management/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Unit tests are included because the feature specification and plan explicitly request testability for services.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the project structure and development tooling.

- [ ] T001 Create project structure per implementation plan in src/, tests/, and specs/001-student-task-management/
- [ ] T002 Initialize Node.js and TypeScript project with Express, Zod, SQLite, and test dependencies
- [ ] T003 [P] Configure TypeScript compiler options and development scripts in tsconfig.json and package.json

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the core infrastructure required before implementing user stories.

- [ ] T004 Create SQLite database module in src/db/sqlite.ts
- [ ] T005 Create task schema and initialization logic in src/db/schema.ts
- [ ] T006 [P] Implement global error handling middleware in src/middleware/errorHandler.ts
- [ ] T007 [P] Implement shared request validation utilities and error mapping in src/schemas/
- [ ] T008 Create base application bootstrap in src/app.ts and src/server.ts

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Criar e acompanhar tarefas acadêmicas (Priority: P1) 🎯 MVP

**Goal**: Allow students to create, view, update, and complete tasks.

**Independent Test**: A student can create a task through the API, retrieve it, and mark it as completed without needing other stories.

### Tests for User Story 1

- [ ] T009 [P] [US1] Add unit tests for task service creation and status transition in tests/unit/services/taskService.test.ts
- [ ] T010 [P] [US1] Add integration tests for task CRUD flow in tests/integration/tasks.api.test.ts

### Implementation for User Story 1

- [ ] T011 [P] [US1] Create task entity and DTO types in src/schemas/task.ts
- [ ] T012 [US1] Implement task repository in src/repositories/taskRepository.ts
- [ ] T013 [US1] Implement task service in src/services/taskService.ts
- [ ] T014 [US1] Implement task controller in src/controllers/taskController.ts
- [ ] T015 [US1] Register task routes in src/app.ts
- [ ] T016 [US1] Add validation and error handling for task creation and updates in src/schemas/task.ts and src/middleware/errorHandler.ts

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Organizar tarefas por prioridade e situação (Priority: P2)

**Goal**: Allow students to filter and prioritize their task list.

**Independent Test**: A student can list tasks filtered by status or priority and see the results in a clear order.

### Tests for User Story 2

- [ ] T017 [P] [US2] Add unit tests for task filtering and sorting rules in tests/unit/services/taskService.test.ts

### Implementation for User Story 2

- [ ] T018 [P] [US2] Extend task service query handling for filtering and sorting in src/services/taskService.ts
- [ ] T019 [US2] Extend controller and route support for query parameters in src/controllers/taskController.ts and src/app.ts
- [ ] T020 [US2] Add validation for query parameters in src/schemas/task.ts

**Checkpoint**: At this point, User Stories 1 and 2 should both work independently.

---

## Phase 5: User Story 3 - Atualizar e remover tarefas antigas (Priority: P3)

**Goal**: Allow students to edit and delete outdated tasks.

**Independent Test**: A student can modify or remove a task and confirm it is no longer shown in the list.

### Tests for User Story 3

- [ ] T021 [P] [US3] Add unit tests for task update and deletion behavior in tests/unit/services/taskService.test.ts

### Implementation for User Story 3

- [ ] T022 [P] [US3] Extend repository methods for update and delete in src/repositories/taskRepository.ts
- [ ] T023 [US3] Extend service logic for update and delete operations in src/services/taskService.ts
- [ ] T024 [US3] Extend controller and routes for update and delete endpoints in src/controllers/taskController.ts and src/app.ts

**Checkpoint**: All user stories should now be independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improve reliability, readability, and developer experience.

- [ ] T025 [P] Update documentation in specs/001-student-task-management/quickstart.md and README.md
- [ ] T026 [P] Add additional unit tests for validation edge cases in tests/unit/services/taskService.test.ts
- [ ] T027 Run the quickstart validation flow and confirm the API works end to end

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - blocks all user stories
- **User Stories (Phase 3+)**: Depend on Foundational completion
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - no dependency on other stories
- **User Story 2 (P2)**: Can start after Foundational - may integrate with US1 but is independently testable
- **User Story 3 (P3)**: Can start after Foundational - may integrate with US1/US2 but is independently testable

### Parallel Opportunities

- T003 can run in parallel with T001 and T002
- T006 and T007 can run in parallel after T004/T005
- US1 tests T009 and T010 can run in parallel
- US1 implementation T011 and T012 can run in parallel
- US2 and US3 tasks are independently parallelizable after the foundational layer is complete

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2.
2. Implement User Story 1.
3. Validate the API end to end before adding more stories.

### Incremental Delivery

1. Deliver the task CRUD core.
2. Add filtering and prioritization support.
3. Add edit and delete workflows.
4. Polish and document the experience.
