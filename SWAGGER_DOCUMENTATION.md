# Swagger/OpenAPI Documentation

## Overview

Swagger (OpenAPI) documentation is configured for the Todo REST API. The documentation is automatically generated from controller decorators and is accessible via Swagger UI.

## Accessing the Documentation

Once the application is running, access the Swagger UI at:

```
http://localhost:3001/api/docs
```

## Installation

The following packages were installed to enable Swagger support:

```bash
npm install @nestjs/swagger@7 swagger-ui-express --legacy-peer-deps
```

## Configuration

### Main Application Setup (src/main.ts)

The Swagger module is initialized in the `bootstrap()` function with the following configuration:

- **Title**: Todo API
- **Description**: A simple Todo REST API with MongoDB
- **Version**: 1.0.0
- **Tags**: Todos (for grouping related endpoints)
- **Base Path**: `/api/docs` (Swagger UI)

### Documented Endpoints

The following **6 endpoints** are fully documented in the Swagger UI:

#### 1. **POST /todos** — Create a new todo
- Creates a new todo item with the provided details
- Request body: `CreateTodoDto`
- Responses:
  - `201 Created` — Returns the created `TodoResponseDto`
  - `400 Bad Request` — Invalid input data

#### 2. **GET /todos** — Get all todos
- Retrieves all non-deleted todo items, optionally filtered by status
- Query parameter: `status` (optional) — one of `pending`, `in-progress`, `completed`
- Responses:
  - `200 OK` — Returns an array of `TodoResponseDto`

#### 3. **GET /todos/:id** — Get a todo by ID
- Retrieves a specific non-deleted todo item by its MongoDB ObjectId
- Path parameter: `id` — The unique identifier of the todo
- Responses:
  - `200 OK` — Returns the `TodoResponseDto`
  - `400 Bad Request` — Invalid todo ID format (not a valid ObjectId)
  - `404 Not Found` — Todo not found

#### 4. **PATCH /todos/:id** — Update a todo
- Updates an existing todo item with partial or complete data
- Path parameter: `id`
- Request body: `UpdateTodoDto` (all fields optional)
- Responses:
  - `200 OK` — Returns the updated `TodoResponseDto`
  - `400 Bad Request` — Invalid input data or invalid todo ID format
  - `404 Not Found` — Todo not found

#### 5. **DELETE /todos/:id** — Hard delete a todo
- Permanently removes a todo item from the database
- Path parameter: `id`
- Responses:
  - `204 No Content` — Todo deleted successfully
  - `400 Bad Request` — Invalid todo ID format
  - `404 Not Found` — Todo not found

#### 6. **PATCH /todos/:id/soft-delete** — Soft delete a todo
- Marks a todo as deleted by setting a `deletedAt` timestamp without removing it from the database
- Soft-deleted todos are excluded from all `GET /todos` and `GET /todos/:id` queries
- Path parameter: `id`
- Responses:
  - `200 OK` — Returns the soft-deleted `TodoResponseDto` (with `deletedAt` populated)
  - `400 Bad Request` — Invalid todo ID format
  - `404 Not Found` — Todo not found

### Data Transfer Objects (DTOs)

#### CreateTodoDto
```typescript
{
  title: string         // required, max 200 chars
  description?: string  // optional, max 1000 chars
  dueDate: string       // required, ISO 8601 date string
  status?: TodoStatus   // optional, enum: 'pending' | 'in-progress' | 'completed'
}
```

#### UpdateTodoDto
All fields from `CreateTodoDto` are optional, allowing partial updates.

#### TodoResponseDto
```typescript
{
  id: string            // MongoDB ObjectId as string
  title: string
  description?: string
  dueDate: Date
  status: TodoStatus    // 'pending' | 'in-progress' | 'completed'
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null  // null for non-deleted todos
}
```

### Decorators Used

- `@ApiTags()` — Groups endpoints in the Swagger UI
- `@ApiOperation()` — Describes the endpoint operation
- `@ApiParam()` — Documents path parameters
- `@ApiQuery()` — Documents query parameters
- `@ApiBody()` — Documents request body (with full schema)
- `@ApiResponse()` — Documents response codes, descriptions, and body schemas

## Running the Application

```bash
npm run start:dev
```

The application will start on port 3001 (or a custom port via `PORT` environment variable).

## Example cURL Requests

### Create a Todo
```bash
curl -X POST http://localhost:3001/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project",
    "description": "Finish the API documentation",
    "dueDate": "2026-05-31",
    "status": "pending"
  }'
```

### Soft Delete a Todo
```bash
curl -X PATCH http://localhost:3001/todos/{id}/soft-delete
```

## Notes

- Swagger decorators provide type-safe documentation that stays in sync with the actual code
- The documentation is automatically regenerated on each build
- `UpdateTodoDto` uses `PartialType` from `@nestjs/swagger` to ensure all optional fields are correctly reflected in the Swagger UI schema
- API clients can import the OpenAPI schema from `/api/docs-json` for code generation
