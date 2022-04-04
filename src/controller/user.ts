import { Context } from '@midwayjs/core';
import { Controller, Get, Inject, Provide } from '@midwayjs/decorator';
import { res } from '../common/utils';
import { UserService } from '../service/user';

@Provide()
@Controller('/api')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/users')
  async getAllUsers() {
    try {
      const users = await this.userService.getAllUsers();
      return res({ data: users });
    } catch (error) {
      return res({
        code: 99999,
        message: 'unknown error',
        data: {},
      });
    }
  }
}
