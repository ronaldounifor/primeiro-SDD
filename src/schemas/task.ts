import { z } from 'zod';

export const PrioritySchema = z.enum(['low', 'medium', 'high']);
export const StatusSchema = z.enum(['pending', 'completed']);

export const CreateTaskInputSchema = z.object({
  title: z.string().trim().min(1, 'Task title is required'),
  description: z.string().trim().optional(),
  dueDate: z.string().datetime({ offset: true }).optional(),
  priority: PrioritySchema.optional().default('medium'),
  status: StatusSchema.optional().default('pending')
});

export const UpdateTaskInputSchema = z.object({
  title: z.string().trim().min(1, 'Task title is required').optional(),
  description: z.string().trim().optional(),
  dueDate: z.string().datetime({ offset: true }).optional(),
  priority: PrioritySchema.optional(),
  status: StatusSchema.optional()
});

export const TaskQuerySchema = z.object({
  status: StatusSchema.optional(),
  priority: PrioritySchema.optional(),
  sortBy: z.enum(['dueDate', 'priority', 'createdAt']).optional().default('createdAt')
});

export type CreateTaskInput = z.infer<typeof CreateTaskInputSchema>;
export type UpdateTaskInput = z.infer<typeof UpdateTaskInputSchema>;
export type TaskQuery = z.infer<typeof TaskQuerySchema>;
