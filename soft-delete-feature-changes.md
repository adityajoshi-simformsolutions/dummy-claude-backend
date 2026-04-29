# Soft Delete Feature Implementation (Specific Prompt)

## Summary
This document highlights the changes made to implement a soft delete endpoint for Todos using a specific and structured prompt.

---

## Key Changes

1. **Entity Update**
   - Added `deletedAt: Date | null` property to the `Todo` entity and ORM entity to mark soft-deleted records.

2. **Repository Update**
   - Added `softDelete(id: string): Promise<Todo | null>` method to the repository interface.
   - Implemented `softDelete` in the TypeORM repository to set `deletedAt` instead of removing the record.
   - Updated `findAll` and `findById` to exclude soft-deleted Todos by default.

3. **Use Case**
   - Created `SoftDeleteTodoUseCase` in the application layer to handle the soft delete logic.

4. **Controller**
   - Added a new PATCH endpoint: `PATCH /todos/:id/soft-delete`.
   - Controller method calls the use case and returns 404 if not found, or 200 with the updated Todo.

5. **Module Registration**
   - Registered `SoftDeleteTodoUseCase` in the module providers.

---

## Benefits of the Specific Prompt
- Clear requirements for endpoint, method, and error handling.
- Ensures all layers (controller, use case, repository, entity) are updated.
- Reduces ambiguity and rework.
- Promotes maintainable and testable code.

---

**All changes were made according to the structured requirements for a robust and consistent implementation.**
