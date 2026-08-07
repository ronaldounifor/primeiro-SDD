import request from 'supertest';
import { describe, it, expect, beforeAll } from 'vitest';
import { app, startApp } from '../../src/app';

describe('Tasks API', () => {
  beforeAll(async () => {
    await startApp();
  });

  it('creates and retrieves a task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({ title: 'Write report', priority: 'high', status: 'pending' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
