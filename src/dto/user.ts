export class CreateUserInput {
  subject: string;
  name: string;
  organization: string;
  stu_id: string;
  gender: number;
  email: string;
  password: string;
  session: number;
  description?: string;
}

export class UpdateUserInput {
  email: string;
  session: number;
  description: string;
}
