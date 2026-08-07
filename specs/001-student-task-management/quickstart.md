# Quickstart: Gerenciamento de Tarefas de Alunos

## Prerequisites

- Node.js 20 or newer
- npm
- SQLite support available through the local runtime

## Setup

1. Install dependencies with `npm install`.
2. Start the development server with `npm run dev`.
3. Use an HTTP client to call the API endpoints defined in the contract.

## Validation Scenarios

1. Create a task via `POST /api/tasks` and confirm it returns `201 Created`.
2. List tasks via `GET /api/tasks` and confirm the new task appears.
3. Update the task via `PUT /api/tasks/:id` and confirm the changes persist.
4. Delete the task via `DELETE /api/tasks/:id` and confirm it is removed.
5. Submit invalid data such as an invalid date and confirm the API returns `400` with a structured error code.
