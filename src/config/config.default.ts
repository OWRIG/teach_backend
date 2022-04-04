import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';

export default (appInfo: MidwayAppInfo) => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1648466230283_2567',
    egg: {
      port: 7001,
    },
    jwt: {
      secret: 'ZHENGDEHOUSHENGDUXUEMINXING',
    },
    orm: {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'teachdb',
      synchronize: true, // 如果第一次使用，不存在表，有同步的需求可以写 true
      logging: false,
    },
    middleware: ['adminAuthMiddleware'],
    security: {
      csrf: {
        // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
        enable: false,
        ignoreJSON: true,
      },
    },
  } as MidwayConfig;
};
