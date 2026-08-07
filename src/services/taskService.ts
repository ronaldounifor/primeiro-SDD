import { CreateTaskInput, TaskQuery, UpdateTaskInput } from '../schemas/task';
import { TaskRepository } from '../repositories/taskRepository';

export class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  async createTask(input: CreateTaskInput): Promise<unknown> {
    const now = new Date().toISOString();
    return this.repository.create({
      ...input,
      createdAt: now,
      updatedAt: now
    });
  }

  async listTasks(query?: TaskQuery): Promise<unknown> {
    const tasks = await this.repository.list();

    return tasks.filter((task) => {
      const matchesStatus = query?.status ? task.status === query.status : true;
      const matchesPriority = query?.priority ? task.priority === query.priority : true;
      return matchesStatus && matchesPriority;
    }).sort((a, b) => {
      if (query?.sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 } as const;
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }

      if (query?.sortBy === 'dueDate') {
        return (a.due_date ?? '').localeCompare(b.due_date ?? '');
      }

      return (a.created_at ?? '').localeCompare(b.created_at ?? '');
    });
  }

  async getTask(id: number): Promise<unknown> {
    return this.repository.getById(id);
  }

  async updateTask(id: number, input: UpdateTaskInput): Promise<unknown> {
    const now = new Date().toISOString();
    return this.repository.update(id, { ...input, updatedAt: now });
  }

  async deleteTask(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }
}
