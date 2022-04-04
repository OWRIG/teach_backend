import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { CacheManager } from '@midwayjs/cache';
import { Repository } from 'typeorm';
import { LoginParams } from '../dto/login';
import { User } from '../entity/user';
import { UserService } from './user';
import { isEmpty } from 'lodash';

@Provide()
export class AuthService {
  @Inject()
  userService: UserService;

  @Inject()
  cacheManager: CacheManager;

  @InjectEntityModel(User)
  user: Repository<User>;

  async getToken(params: LoginParams) {
    const { stu_id, organization, password } = params;
    const id = organization + stu_id;
    const user = await this.user.findOneBy({ stu_id: id });
    if (isEmpty(user)) {
      return null;
    }
    const saltedPassword = await this.userService.utils.md5(password);
    if (user?.password !== saltedPassword) {
      return null;
    }
    const jwtSign = await this.userService.utils.jwtSign(
      user!.stu_id.toString()
    );
    await this.cacheManager.set(id, jwtSign, { ttl: 7200 });
    return {
      token: jwtSign,
      user: {
        stu_id: user!.stu_id,
        name: user!.name,
        organization: user!.organization,
        role: user!.role,
      },
    };
  }

  async removeToken(stu_id: string) {
    await this.cacheManager.del(stu_id);
  }
}
