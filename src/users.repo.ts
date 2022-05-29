import CRUD from './crud';
import { User, UserDbDetails, UserDbSchema, UserDetails, UserDetailsSchema, UserSchema } from './user';

export default class UsersRepository extends CRUD<
  User,
  UserDetails
> {
  constructor() {
    super('public.users', UserDbSchema, UserDbDetails);
  }

  async getByUsername(username: string): Promise<User | undefined> {
    //   const result = await sql.query(`
    //   select * from ${this.tableName}
    //   where username = '${username}'
    // `);
    return undefined;
  }

  async getAllAdmins(): Promise<User[]> {
    // const result = await sql.query(`
    //   select * from ${this.tableName}
    //   where role = 'admin'
    // `);
    return [];
  }
}
