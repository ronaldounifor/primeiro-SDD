# Tasks API Contract

## Base URL

`/api/tasks`

## Endpoints

### POST /api/tasks
Create a new task.

**Request body**
```json
{
  "title": "Estudar para prova",
  "description": "Revisar capítulos 1 e 2",
  "dueDate": "2026-08-10T23:59:59Z",
  "priority": "high",
  "status": "pending"
}
```

**Responses**
- `201 Created`: task created successfully
- `400 Bad Request`: invalid input or validation error

### GET /api/tasks
List all tasks.

**Responses**
- `200 OK`: task list returned

### GET /api/tasks/:id
Get a single task by id.

**Responses**
- `200 OK`: task returned
- `404 Not Found`: task not found

### PUT /api/tasks/:id
Update an existing task.

**Request body**
```json
{
  "title": "Estudar para prova",
  "status": "completed"
}
```

**Responses**
- `200 OK`: task updated successfully
- `400 Bad Request`: invalid input
- `404 Not Found`: task not found

### DELETE /api/tasks/:id
Delete a task.

**Responses**
- `204 No Content`: task deleted successfully
- `404 Not Found`: task not found

## Error Response Format

```json
{
  "error": {
    "code": "E_INVALID_DATE",
    "message": "The provided due date is invalid"
  }
}
```
