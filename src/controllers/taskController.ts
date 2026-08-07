import { Request, Response, NextFunction } from 'express';
import { TaskService } from '../services/taskService';
import { CreateTaskInputSchema, UpdateTaskInputSchema, TaskQuerySchema } from '../schemas/task';

export class TaskController {
  constructor(private readonly service: TaskService) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = CreateTaskInputSchema.parse(req.body);
      const task = await this.service.createTask(parsed);
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = TaskQuerySchema.parse(req.query);
      const tasks = await this.service.listTasks(parsed);
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const task = await this.service.getTask(Number(req.params.id));
      if (!task) {
        res.status(404).json({ error: { code: 'E_NOT_FOUND', message: 'Task not found' } });
        return;
      }
      res.json(task);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = UpdateTaskInputSchema.parse(req.body);
      const task = await this.service.updateTask(Number(req.params.id), parsed);
      if (!task) {
        res.status(404).json({ error: { code: 'E_NOT_FOUND', message: 'Task not found' } });
        return;
      }
      res.json(task);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const deleted = await this.service.deleteTask(Number(req.params.id));
      if (!deleted) {
        res.status(404).json({ error: { code: 'E_NOT_FOUND', message: 'Task not found' } });
        return;
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
