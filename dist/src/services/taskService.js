"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
class TaskService {
    constructor(repository) {
        this.repository = repository;
    }
    async createTask(input) {
        const now = new Date().toISOString();
        return this.repository.create({
            ...input,
            createdAt: now,
            updatedAt: now
        });
    }
    async listTasks(query) {
        const tasks = await this.repository.list();
        return tasks.filter((task) => {
            const matchesStatus = query?.status ? task.status === query.status : true;
            const matchesPriority = query?.priority ? task.priority === query.priority : true;
            return matchesStatus && matchesPriority;
        }).sort((a, b) => {
            if (query?.sortBy === 'priority') {
                const priorityOrder = { high: 0, medium: 1, low: 2 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }
            if (query?.sortBy === 'dueDate') {
                return (a.due_date ?? '').localeCompare(b.due_date ?? '');
            }
            return (a.created_at ?? '').localeCompare(b.created_at ?? '');
        });
    }
    async getTask(id) {
        return this.repository.getById(id);
    }
    async updateTask(id, input) {
        const now = new Date().toISOString();
        return this.repository.update(id, { ...input, updatedAt: now });
    }
    async deleteTask(id) {
        return this.repository.delete(id);
    }
}
exports.TaskService = TaskService;
