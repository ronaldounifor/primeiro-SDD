import express from 'express';
import { TaskController } from './controllers/taskController';
import { TaskService } from './services/taskService';
import { TaskRepository } from './repositories/taskRepository';
import { errorHandler } from './middleware/errorHandler';
import { initializeDatabase } from './db/sqlite';

export const app = express();
app.use(express.json());

const repository = new TaskRepository();
const service = new TaskService(repository);
const controller = new TaskController(service);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/tasks', controller.create);
app.get('/api/tasks', controller.list);
app.get('/api/tasks/:id', controller.getById);
app.put('/api/tasks/:id', controller.update);
app.delete('/api/tasks/:id', controller.delete);

app.use(errorHandler);

export async function startApp(): Promise<void> {
  await initializeDatabase();
}
