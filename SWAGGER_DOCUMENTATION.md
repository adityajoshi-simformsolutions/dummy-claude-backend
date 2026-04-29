# Swagger/OpenAPI Documentation

## Overview

Swagger (OpenAPI) documentation has been configured for the Todo REST API. The API documentation is automatically generated from the controller definitions and is accessible via the Swagger UI.

## Accessing the Documentation

Once the application is running, you can access the Swagger UI at:

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

The following 5 endpoints are fully documented in the Swagger UI:

#### 1. **POST /todos** - Create a new todo
- Creates a new todo item with the provided details
- Request: `CreateTodoDto`
- Response: 201 Created / 400 Bad Request

#### 2. **GET /todos** - Get all todos
- Retrieve all todo items, optionally filtered by status
- Query Parameter: `status` (optional) - Filter by pending, in-progress, or completed
- Response: 200 OK

#### 3. **GET /todos/:id** - Get a todo by ID
- Retrieve a specific todo item by its ID
- Path Parameter: `id` - The unique identifier of the todo
- Response: 200 OK / 404 Not Found

#### 4. **PATCH /todos/:id** - Update a todo
- Update an existing todo item with partial or complete data
- Path Parameter: `id`
- Request: `UpdateTodoDto`
- Response: 200 OK / 400 Bad Request / 404 Not Found

#### 5. **DELETE /todos/:id** - Delete a todo
- Permanently delete a todo item (hard delete)
- Path Parameter: `id`
- Response: 204 No Content / 404 Not Found

### Excluded Endpoint (Intentionally)

#### **PATCH /todos/:id/soft-delete** - Soft delete a todo
- **Status**: ⚠️ **NOT DOCUMENTED IN SWAGGER** (Hidden)
- This endpoint is intentionally excluded from the Swagger documentation using the `@ApiExcludeEndpoint()` decorator
- Performs a soft delete operation on a todo item (marks it as deleted without removing it from the database)
- The endpoint still works and is accessible at `/todos/:id/soft-delete`, but it will not appear in the Swagger UI

### Data Transfer Objects (DTOs)

#### CreateTodoDto
```typescript
{
  title: string (required, max 200 chars),
  description?: string (optional, max 1000 chars),
  dueDate: string (required, ISO 8601 format),
  status?: TodoStatus (optional, enum: pending|in-progress|completed)
}
```

#### UpdateTodoDto
All fields from CreateTodoDto are optional, allowing partial updates.

### Decorators Used

- `@ApiTags()` - Groups endpoints in the Swagger UI
- `@ApiOperation()` - Describes the endpoint operation
- `@ApiParam()` - Documents path parameters
- `@ApiQuery()` - Documents query parameters
- `@ApiBody()` - Documents request body
- `@ApiResponse()` - Documents response codes and descriptions
- `@ApiProperty()` - Documents DTO properties
- `@ApiExcludeEndpoint()` - Excludes an endpoint from Swagger documentation

## Why the Soft-Delete Endpoint is Hidden

The soft-delete endpoint (`PATCH /todos/:id/soft-delete`) is intentionally excluded from the Swagger documentation to:
1. Keep the public API documentation cleaner
2. Demonstrate the capability to selectively document endpoints
3. Hide internal/administrative operations from the standard API documentation

However, the endpoint remains **fully functional** and can still be called directly using HTTP clients (e.g., cURL, Postman).

## Running the Application

```bash
npm run start:dev
```

The application will start on port 3001 (or a custom port via `PORT` environment variable).

## Verification

You can verify the Swagger setup by:
1. Starting the application: `npm run start:dev`
2. Opening your browser to: `http://localhost:3001/api/docs`
3. You should see the Swagger UI with 5 documented endpoints
4. The soft-delete endpoint will NOT appear in the UI

## Example cURL Requests

### Create a Todo (Documented)
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

### Soft Delete a Todo (Hidden from Swagger, but functional)
```bash
curl -X PATCH http://localhost:3001/todos/{id}/soft-delete
```

## Notes

- Swagger decorators provide type-safe documentation that stays in sync with the actual code
- The documentation is automatically regenerated on each build
- API clients can import the OpenAPI schema for code generation
