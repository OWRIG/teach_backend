import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';
import * as orm from '@midwayjs/orm';
import * as cache from '@midwayjs/cache';
import { join } from 'path';
import * as egg from '@midwayjs/web';

@Configuration({
  imports: [egg, orm, cache],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady() {}
}
