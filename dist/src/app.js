"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
exports.startApp = startApp;
const express_1 = __importDefault(require("express"));
const taskController_1 = require("./controllers/taskController");
const taskService_1 = require("./services/taskService");
const taskRepository_1 = require("./repositories/taskRepository");
const errorHandler_1 = require("./middleware/errorHandler");
const sqlite_1 = require("./db/sqlite");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
const repository = new taskRepository_1.TaskRepository();
const service = new taskService_1.TaskService(repository);
const controller = new taskController_1.TaskController(service);
exports.app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
exports.app.post('/api/tasks', controller.create);
exports.app.get('/api/tasks', controller.list);
exports.app.get('/api/tasks/:id', controller.getById);
exports.app.put('/api/tasks/:id', controller.update);
exports.app.delete('/api/tasks/:id', controller.delete);
exports.app.use(errorHandler_1.errorHandler);
async function startApp() {
    await (0, sqlite_1.initializeDatabase)();
}
