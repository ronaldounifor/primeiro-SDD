# Data Model: Gerenciamento de Tarefas de Alunos

## Core Entities

### Task
Represents a student task or academic commitment.

**Fields**
- `id`: unique identifier for the task
- `title`: required short description of the task
- `description`: optional detailed note
- `dueDate`: optional due date in ISO 8601 UTC format
- `priority`: one of `low`, `medium`, `high`
- `status`: one of `pending`, `completed`
- `createdAt`: timestamp in ISO 8601 UTC format
- `updatedAt`: timestamp in ISO 8601 UTC format

**Validation Rules**
- `title` is required and must not be empty.
- `dueDate` must be a valid ISO 8601 date when provided.
- `priority` must be one of the allowed values.
- `status` must be one of the allowed values.

**Relationships**
- A task belongs to one student context; in the initial version, the service may treat the task as scoped to the current user/session.

## Repository Responsibilities

- Create a task.
- Read one task by id.
- Read all tasks for the current context.
- Update a task.
- Delete a task.

## Error Model

- `E_INVALID_DATE`: invalid date format or invalid date value.
- `E_INVALID_PRIORITY`: unsupported priority value.
- `E_INVALID_STATUS`: unsupported status value.
- `E_NOT_FOUND`: requested task does not exist.
- `E_VALIDATION`: generic validation failure.
