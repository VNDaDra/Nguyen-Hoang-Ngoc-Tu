import { NextFunction, Request, Response, Router } from 'express';
import { handleServiceResponse } from '../common/utils/httpHandlers';
import { FindManyUserFilter } from '../service/interface/user.interface';
import { UserService } from '../service/user.service';

export class UserRouter {
  private path = '/user';
  private _router: Router = Router();
  private userService: UserService;

  /**
   * We could use dependency injection for better decouling
   */
  constructor() {
    this.initRoute();
    this.userService = new UserService();
  }

  private initRoute() {
    this._router.get(this.path, this.getManyUsers.bind(this));
    this._router.get(`${this.path}/:userId`, this.getOneUser.bind(this));
    this._router.post(this.path, this.createUser.bind(this));
    this._router.patch(`${this.path}/:userId`, this.updateUser.bind(this));
    this._router.delete(`${this.path}/:userId`, this.deleteUser.bind(this));
  }

  private async getManyUsers(request: Request, response: Response, next: NextFunction) {
    const { age, email } = request.query;
    const filter: FindManyUserFilter = {};

    if (typeof age === 'string') {
      filter.age = Number.parseInt(age);
    }
    if (typeof email === 'string') {
      filter.email = email.trim();
    }
    const users = await this.userService.findMany(filter);
    handleServiceResponse(users, response);
  }

  private async getOneUser(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.params;
    const user = await this.userService.findOne(userId);
    handleServiceResponse(user, response);
  }

  private async createUser(request: Request, response: Response, next: NextFunction) {
    const payload = request.body;
    const user = await this.userService.create(payload);
    handleServiceResponse(user, response);
  }

  private async updateUser(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.params;
    const payload = request.body;
    const user = await this.userService.update(userId, payload);
    handleServiceResponse(user, response);
  }

  private async deleteUser(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.params;
    const user = await this.userService.delete(userId);
    handleServiceResponse(user, response);
  }

  public get router() {
    return this._router;
  }
}
