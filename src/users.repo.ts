import Repo from './repo';
import { User, UserDetails, UserDetailsSchema, UserSchema } from "./user";

export default class UsersRepository extends Repo<
  User,
  UserDetails
> {
  constructor() {
    super('users', UserSchema, UserDetailsSchema);
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
