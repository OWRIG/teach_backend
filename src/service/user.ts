import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { isEmpty } from 'lodash';
import { CreateUserInput } from '../dto/user';
import { User } from '../entity/user';
import { Utils } from '../common/utils';

@Provide()
export class UserService {
  @Inject()
  utils: Utils;

  @InjectEntityModel(User)
  user: Repository<User>;

  async getUserById(id: string) {
    const user = await this.user.findOne({
      where: {
        stu_id: id,
      },
    });
    return user;
  }

  async createUser(params: CreateUserInput): Promise<any> {
    const id = params.organization + params.stu_id;
    const exists = await this.getUserById(id);
    if (!isEmpty(exists)) {
      return null;
    }
    const saltedPassword = await this.utils.md5(params.password);
    const _user = { ...params, stu_id: id, password: saltedPassword };
    const res = await this.user.save(_user);
    return res;
  }

  async updateUser(params: CreateUserInput): Promise<any> {
    const stuId = params.organization + params.stu_id;
    const exists = await this.user.findOneBy({ stu_id: stuId });
    if (!isEmpty(exists)) {
      return null;
    }
    const _user = { ...params, stu_id: stuId };
    const res = await this.user.save(_user);
    return res;
  }

  async updateUserByAdmin(params: CreateUserInput): Promise<any> {
    const stuId = params.organization + params.stu_id;
    const exists = await this.user.findOneBy({ stu_id: stuId });
    if (!isEmpty(exists)) {
      return null;
    }
    const _user = { ...params, stu_id: stuId };
    const res = await this.user.save(_user);
    return res;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.user.find({
      select: [
        'user_id',
        'name',
        'subject',
        'organization',
        'stu_id',
        'email',
        'description',
        'session',
        'role',
      ],
      order: { role: 'DESC' },
    });
    return users;
  }
}
