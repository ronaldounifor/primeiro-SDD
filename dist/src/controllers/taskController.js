"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const task_1 = require("../schemas/task");
class TaskController {
    constructor(service) {
        this.service = service;
        this.create = async (req, res, next) => {
            try {
                const parsed = task_1.CreateTaskInputSchema.parse(req.body);
                const task = await this.service.createTask(parsed);
                res.status(201).json(task);
            }
            catch (error) {
                next(error);
            }
        };
        this.list = async (req, res, next) => {
            try {
                const parsed = task_1.TaskQuerySchema.parse(req.query);
                const tasks = await this.service.listTasks(parsed);
                res.json(tasks);
            }
            catch (error) {
                next(error);
            }
        };
        this.getById = async (req, res, next) => {
            try {
                const task = await this.service.getTask(Number(req.params.id));
                if (!task) {
                    res.status(404).json({ error: { code: 'E_NOT_FOUND', message: 'Task not found' } });
                    return;
                }
                res.json(task);
            }
            catch (error) {
                next(error);
            }
        };
        this.update = async (req, res, next) => {
            try {
                const parsed = task_1.UpdateTaskInputSchema.parse(req.body);
                const task = await this.service.updateTask(Number(req.params.id), parsed);
                if (!task) {
                    res.status(404).json({ error: { code: 'E_NOT_FOUND', message: 'Task not found' } });
                    return;
                }
                res.json(task);
            }
            catch (error) {
                next(error);
            }
        };
        this.delete = async (req, res, next) => {
            try {
                const deleted = await this.service.deleteTask(Number(req.params.id));
                if (!deleted) {
                    res.status(404).json({ error: { code: 'E_NOT_FOUND', message: 'Task not found' } });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.TaskController = TaskController;
