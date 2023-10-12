import express from 'express';
import UsersController from './controllers/users';
import { createValidator } from 'express-joi-validation';
import { userIdParamSchema, userBodyUpdateSchema, userBodySchema, userQuerySchema } from './validation/user-schemas';

export const initApp = (controller: UsersController) => {

  const validator = createValidator();
  const app = express();
  app.disable('x-powered-by');
  
  app.use(express.json());
  
  app.get(
    '/users',
    validator.query(userQuerySchema),
    controller.getUsers.bind(controller)
  );
  
  app.get(
    '/users/:id',
    validator.params(userIdParamSchema),
    controller.getUserById.bind(controller)
  );
  
  app.post(
    '/users/',
    validator.body(userBodySchema),
    controller.postUser.bind(controller)
  );

  app.put(
    '/users/:id',
    validator.params(userIdParamSchema),
    validator.body(userBodyUpdateSchema),
    controller.updateUser.bind(controller)
  )
  
  app.delete(
    '/users/:id',
    validator.params(userIdParamSchema),
    controller.deleteUser.bind(controller)
  );
  
  app.use((_req, res) => res.status(404).json({ msg: 'Path not found' }));

  return app;
};
