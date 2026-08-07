"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskQuerySchema = exports.UpdateTaskInputSchema = exports.CreateTaskInputSchema = exports.StatusSchema = exports.PrioritySchema = void 0;
const zod_1 = require("zod");
exports.PrioritySchema = zod_1.z.enum(['low', 'medium', 'high']);
exports.StatusSchema = zod_1.z.enum(['pending', 'completed']);
exports.CreateTaskInputSchema = zod_1.z.object({
    title: zod_1.z.string().trim().min(1, 'Task title is required'),
    description: zod_1.z.string().trim().optional(),
    dueDate: zod_1.z.string().datetime({ offset: true }).optional(),
    priority: exports.PrioritySchema.optional().default('medium'),
    status: exports.StatusSchema.optional().default('pending')
});
exports.UpdateTaskInputSchema = zod_1.z.object({
    title: zod_1.z.string().trim().min(1, 'Task title is required').optional(),
    description: zod_1.z.string().trim().optional(),
    dueDate: zod_1.z.string().datetime({ offset: true }).optional(),
    priority: exports.PrioritySchema.optional(),
    status: exports.StatusSchema.optional()
});
exports.TaskQuerySchema = zod_1.z.object({
    status: exports.StatusSchema.optional(),
    priority: exports.PrioritySchema.optional(),
    sortBy: zod_1.z.enum(['dueDate', 'priority', 'createdAt']).optional().default('createdAt')
});
