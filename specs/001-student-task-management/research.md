# Research: Gerenciamento de Tarefas de Alunos

## Research Goals

Resolve implementation uncertainties and establish the technical approach for the service.

## Findings

### 1. API style
- A REST API is the most direct fit for the CRUD requirements in the specification.
- Express is a safe default for a small service because it is simple, widely used, and easy to structure with controllers, services, and repositories.

### 2. Data storage
- SQLite is appropriate for a local-first service because it avoids container requirements and supports quick development and testing.
- The database can be a single `tasks` table with columns for id, title, description, due_date, priority, status, created_at, updated_at, and user_id (if authentication is later introduced).

### 3. Validation strategy
- Zod provides strong runtime validation and clear error reporting for request payloads.
- Validation errors should be mapped to domain-specific codes such as `E_INVALID_DATE`, `E_INVALID_PRIORITY`, and `E_INVALID_STATUS`.

### 4. Error handling
- A global middleware should catch thrown errors and return consistent JSON responses with status codes and error codes.
- Validation failures should produce `400 Bad Request`, while not-found cases should use `404 Not Found`.

### 5. Testing approach
- Unit tests should focus on service behavior, especially validation rules and business logic such as status transitions and date handling.
- Repository logic can be tested with a lightweight in-memory SQLite setup or a small test database fixture.

## Decisions

- Use Express with TypeScript for the API layer.
- Use SQLite via a small database module and repository abstraction.
- Use Zod for request validation and domain error mapping.
- Use Vitest for unit testing service logic.
- Use ISO 8601 UTC strings for dates.

## Alternatives considered

- Fastify instead of Express: more performant, but Express is simpler for a small implementation and aligns well with the requested architecture.
- PostgreSQL instead of SQLite: more scalable, but adds operational complexity not needed for the initial local-first version.
- Manual validation without schema library: simpler initially, but less robust and harder to maintain than Zod.
