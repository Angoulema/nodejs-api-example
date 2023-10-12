import { Response } from "express";
import UserService from "../services/user-service";
import {
  ContainerTypes,
  // Use this as a replacement for express.Request
  ValidatedRequest,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
} from 'express-joi-validation';


interface UserIdParamSchema extends ValidatedRequestSchema {
  [ContainerTypes.Params]: {
    id: string;
  }
}

interface UserQuerySchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    subStr: string;
    limit: number;
  }
}

interface UserBodySchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    login: string;
    password: string;
    age: number;
  }
}

interface UserParamBodySchema extends ValidatedRequestSchema {
  [ContainerTypes.Params]: {
    id: string;
  },
  [ContainerTypes.Body]: {
    login?: string;
    password?: string;
    age?: number;
  }
}

export default class UsersController {
  private readonly service: UserService;

  constructor() {
    this.service = new UserService();
  }

  public async getUsers(req: ValidatedRequest<UserQuerySchema>, res: Response) {
    const { query } = req;
    const { subStr, limit } = query;
    const result = await this.service.getUsers(subStr, limit)
    if (result) {
      res.send(result);
    } else {
      res.status(404).send();
    }
  }

  public async getUserById(req: ValidatedRequest<UserIdParamSchema>, res: Response) {
    const { params: { id } } = req;
    const result = await this.service.getUser(id);
    if (result) {
      res.send(result);
    } else {
      res.status(404).send();
    }
  }

  public async postUser(req: ValidatedRequest<UserBodySchema>, res: Response) {
    const { body } = req;
    const result = await this.service.postUser(body);
    res.send(result)
  }

  public async updateUser(req: ValidatedRequest<UserParamBodySchema>, res: Response) {
    const { params: { id }, body } = req;
    const result = await this.service.updateUser(id, body);
    if (result) {
      res.status(200).send();
    } else {
      res.status(400).send();
    }
  }

  public async deleteUser(req: ValidatedRequest<UserIdParamSchema>, res: Response) {
    const { params: { id } } = req;
    const result = await this.service.deleteUser(id);
    if (result) {
      res.status(200).send();
    } else {
      res.status(404).send();
    }
  }
};
