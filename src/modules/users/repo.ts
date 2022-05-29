import CRUD from '../../crud';
import { User, UserDbDetails, UserDbSchema, UserDetails, UserDetailsSchema, UserSchema } from './user';
import { connect } from '../../database';

export default class UsersRepository extends CRUD<
  User,
  UserDetails
> {
  constructor() {
    super('public.users', UserDbSchema, UserDbDetails);
  }

  async getByUsername(username: string): Promise<User> {
    const db = await connect();
    if (!db) throw new Error('Couldnt get db');
    const result = await db.query({ text: `SELECT * FROM ${this.tableName} WHERE username = $1`, values: [username] });
    const user = UserDbSchema.parse(result.rows[0]);
    return user;
  }

}
