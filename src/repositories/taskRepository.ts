import { db } from '../db/sqlite';
import { CreateTaskInput, UpdateTaskInput } from '../schemas/task';

export interface TaskRecord {
  id: number;
  title: string;
  description?: string;
  due_date?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed';
  created_at: string;
  updated_at: string;
}

export class TaskRepository {
  async create(input: CreateTaskInput & { createdAt: string; updatedAt: string }): Promise<TaskRecord> {
    const result = await this.run(
      `
      INSERT INTO tasks (title, description, due_date, priority, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [input.title, input.description ?? null, input.dueDate ?? null, input.priority, input.status, input.createdAt, input.updatedAt]
    );

    const createdTask = await this.getById(result.lastID as number);
    if (!createdTask) {
      throw new Error('Failed to create task');
    }

    return createdTask;
  }

  async list(): Promise<TaskRecord[]> {
    return this.all(`SELECT * FROM tasks ORDER BY created_at DESC`);
  }

  async getById(id: number): Promise<TaskRecord | null> {
    return this.get(`SELECT * FROM tasks WHERE id = ?`, [id]);
  }

  async update(id: number, input: UpdateTaskInput & { updatedAt: string }): Promise<TaskRecord | null> {
    const fields: string[] = [];
    const values: unknown[] = [];

    if (input.title !== undefined) {
      fields.push('title = ?');
      values.push(input.title);
    }

    if (input.description !== undefined) {
      fields.push('description = ?');
      values.push(input.description);
    }

    if (input.dueDate !== undefined) {
      fields.push('due_date = ?');
      values.push(input.dueDate);
    }

    if (input.priority !== undefined) {
      fields.push('priority = ?');
      values.push(input.priority);
    }

    if (input.status !== undefined) {
      fields.push('status = ?');
      values.push(input.status);
    }

    fields.push('updated_at = ?');
    values.push(input.updatedAt);
    values.push(id);

    await this.run(`UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`, values);
    return this.getById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.run(`DELETE FROM tasks WHERE id = ?`, [id]);
    return (result.changes ?? 0) > 0;
  }

  private run(sql: string, params: unknown[] = []): Promise<{ lastID: number; changes: number }> {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve({ lastID: this.lastID, changes: this.changes });
      });
    });
  }

  private get<T>(sql: string, params: unknown[] = []): Promise<T | null> {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        resolve((row as T) ?? null);
      });
    });
  }

  private all<T>(sql: string, params: unknown[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows as T[]);
      });
    });
  }
}
