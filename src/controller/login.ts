import { Context } from '@midwayjs/core';
import {
  Controller,
  Post,
  Inject,
  Provide,
  Body,
  ALL,
  Get,
} from '@midwayjs/decorator';
import { isEmpty } from 'lodash';
import { LoginParams } from '../dto/login';
import { AuthService } from '../service/auth';
import { res, Utils } from '../common/utils';
import { CreateUserInput } from '../dto/user';
import { UserService } from '../service/user';

@Provide()
@Controller('/api')
export class LoginController {
  @Inject()
  ctx: Context;

  @Inject()
  utils: Utils;

  @Inject()
  authService: AuthService;

  @Inject()
  userService: UserService;

  @Get('/profile')
  async getProfile(ctx: any) {
    const token = ctx.request.header.authorization;
    const id = await this.utils.jwtVerify(token);
    try {
      const user = await this.userService.getUserById(id);
      const _user = { ...user, password: void 0 };
      if (user) {
        return res({ data: _user });
      } else {
        return res({ code: 11001 });
      }
    } catch (error) {
      if (error) {
        return res({
          code: 10000,
          message: 'Params Validation Error',
          data: {},
        });
      } else {
        return res({
          code: 99999,
          message: 'unknown error',
          data: {},
        });
      }
    }
  }

  @Post('/login')
  async login(@Body(ALL) loginParams: LoginParams) {
    const jwtSign = await this.authService.getToken(loginParams);
    if (isEmpty(jwtSign)) {
      return res({
        code: 10003,
      });
    }
    return res({
      data: jwtSign,
      message: '登录成功',
    });
  }

  @Post('/register')
  async register(@Body(ALL) createParam: CreateUserInput) {
    try {
      const user = await this.userService.createUser(createParam);
      if (user) {
        return res({ data: null });
      } else {
        return res({ code: 10001 });
      }
    } catch (error) {
      if (error) {
        return res({
          code: 10000,
          message: 'Params Validation Error',
          data: {},
        });
      } else {
        return res({
          code: 99999,
          message: 'unknown error',
          data: {},
        });
      }
    }
  }

  @Post('/signout')
  async signOut(@Body(ALL) stu_id: string) {
    try {
      await this.authService.removeToken(stu_id);
      return res({ message: '登出成功' });
    } catch (error) {
      if (error) {
        return res({
          code: 10000,
          message: 'Params Validation Error',
          data: {},
        });
      } else {
        return res({
          code: 99999,
          message: 'unknown error',
          data: {},
        });
      }
    }
  }
}
