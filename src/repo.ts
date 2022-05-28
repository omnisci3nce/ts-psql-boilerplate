import { table } from 'console';
import { connectToDb } from './db';

export interface IRepo<T, D> {
  getAll(): Promise<T[]>;
  getOne(id: string): Promise<T | undefined>;
  create(data: D): Promise<number>;
  // update(id: string): Promise<T>
  delete(id: string): Promise<void>
}

export interface Validator<T> {
  parse: (obj: T) => T;
}

export default class Repo<T, D> implements IRepo<T, D> {
  tableName: string;
  schema: Validator<T>;
  detailsSchema: Validator<D>;

  constructor(
    tableName: string,
    schema: Validator<T>,
    detailsSchema: Validator<D>
  ) {
    this.tableName = tableName;
    this.schema = schema;
    this.detailsSchema = detailsSchema;
  }

  async getAll(): Promise<T[]> {
    const db = await connectToDb();
    if (!db) throw new Error('Couldnt get db');
    const rows = await db.query(`SELECT * from ${this.tableName}`).then((res) => res.rows);
    return rows.map(row => this.schema.parse(row));
  }

  async getOne(id: string): Promise<T | undefined> {
    return undefined;
  }

  async create(data: D): Promise<number> {
    return 1;
  }

  async delete(id: string): Promise<void> {
    // 
  }
}
