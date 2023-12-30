import { randomUUID } from 'node:crypto';
import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query;

      const tasks = database.select(
        'tasks',
        search
          ? {
              title: search,
              description: search,
            }
          : null
      );

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (!title) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: 'Title is required' }));
      }

      if (!description) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: 'Description is required' }));
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      database.insert('tasks', task);

      return res.writeHead(201).end();
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      if (!title && !description) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: 'Title or description is required' }));
      }

      // validar se o ID pertence a uma task salva no banco de dados.
      const [task] = database.select('tasks', { id });
      
      if (!task) {
        return res
          .writeHead(404)
          .end(JSON.stringify({ message: 'Task not found' }));
      }

      database.update('tasks', id, {
        ...task,
        title: title ?? task.title,
        description: description ?? task.description,
        updatedAt: new Date(),
      });

      return res.writeHead(204).end();      
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params;

      const [task] = database.select('tasks', { id });

      if (!task) {
        return res
          .writeHead(404)
          .end(JSON.stringify({ message: 'Task not found' }));
      }

      database.update('tasks', id, {
        ...task,
        completedAt: !!task.completedAt ? null : new Date(),
      });

      return res.writeHead(204).end();
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;

      const [task] = database.select('tasks', { id });

      if (!task) {
        return res
          .writeHead(404)
          .end(JSON.stringify({ message: 'Task not found' }));
      }

      database.delete('tasks', id);

      return res.writeHead(204).end();
    },
  },
];
