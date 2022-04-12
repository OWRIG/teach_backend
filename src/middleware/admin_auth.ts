import { Provide } from '@midwayjs/decorator';
import { CacheManager } from '@midwayjs/cache';
import { IMiddleware, NextFunction } from '@midwayjs/core';
import { Context } from 'egg';
import { isEmpty } from 'lodash';
import { res, Utils } from '../common/utils';
import { ResOp } from '../interface';

@Provide()
export class AdminAuthMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const token = ctx.get('Authorization');
      const url = ctx.url;
      if (url === '/api/login' && url === '/api/login') {
        await next();
        return;
      } else {
        if (isEmpty(token)) {
          // 无法通过token校验
          this.reject(ctx, { code: 11001 });
          return;
        }
        const utils = await ctx.requestContext.getAsync(Utils);
        const cacheManager = await ctx.requestContext.getAsync(CacheManager);
        const stu_id = await utils.jwtVerify(token);
        const cacheToken = await cacheManager.get(stu_id);
        if (cacheToken !== token) {
          this.reject(ctx, { code: 11002 });
          return;
        }
      }
      // pass
      await next();
    };
  }

  reject(ctx: Context, op: ResOp): void {
    ctx.status = 200;
    ctx.body = res(op);
  }
}
