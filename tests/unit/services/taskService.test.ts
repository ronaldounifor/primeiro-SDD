import { describe, it, expect } from 'vitest';
import { TaskService } from '../../../src/services/taskService';

class FakeRepository {
  public created: unknown[] = [];
  public updated: unknown[] = [];
  public deleted: number[] = [];
  public tasks: Array<{ id: number; title: string; status: string; priority: string; created_at: string; due_date?: string }> = [];

  async create(input: any) {
    const task = { id: 1, ...input };
    this.created.push(task);
    this.tasks.push(task);
    return task;
  }

  async list() {
    return this.tasks;
  }

  async getById(id: number) {
    return this.tasks.find((task) => task.id === id) ?? null;
  }

  async update(id: number, input: any) {
    this.updated.push({ id, input });
    const task = this.tasks.find((entry) => entry.id === id);
    if (!task) return null;
    Object.assign(task, input);
    return task;
  }

  async delete(id: number) {
    this.deleted.push(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return true;
  }
}

describe('TaskService', () => {
  it('creates and lists tasks', async () => {
    const repository = new FakeRepository();
    const service = new TaskService(repository as any);

    const created = await service.createTask({ title: 'Study', priority: 'high' as any, status: 'pending' as any });
    const tasks = await service.listTasks();

    expect(created).toBeDefined();
    expect(tasks).toHaveLength(1);
  });

  it('updates task status', async () => {
    const repository = new FakeRepository();
    const service = new TaskService(repository as any);

    await service.createTask({ title: 'Study', priority: 'high' as any, status: 'pending' as any });
    const updated = await service.updateTask(1, { status: 'completed' as any });

    expect(updated).toBeDefined();
  });
});
