"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const sqlite_1 = require("../db/sqlite");
class TaskRepository {
    async create(input) {
        const result = await this.run(`
      INSERT INTO tasks (title, description, due_date, priority, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [input.title, input.description ?? null, input.dueDate ?? null, input.priority, input.status, input.createdAt, input.updatedAt]);
        const createdTask = await this.getById(result.lastID);
        if (!createdTask) {
            throw new Error('Failed to create task');
        }
        return createdTask;
    }
    async list() {
        return this.all(`SELECT * FROM tasks ORDER BY created_at DESC`);
    }
    async getById(id) {
        return this.get(`SELECT * FROM tasks WHERE id = ?`, [id]);
    }
    async update(id, input) {
        const fields = [];
        const values = [];
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
    async delete(id) {
        const result = await this.run(`DELETE FROM tasks WHERE id = ?`, [id]);
        return (result.changes ?? 0) > 0;
    }
    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            sqlite_1.db.run(sql, params, function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ lastID: this.lastID, changes: this.changes });
            });
        });
    }
    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            sqlite_1.db.get(sql, params, (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(row ?? null);
            });
        });
    }
    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            sqlite_1.db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });
    }
}
exports.TaskRepository = TaskRepository;
