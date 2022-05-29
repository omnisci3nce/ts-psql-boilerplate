import { connect } from '../database';

export interface IRepo<T, D> {
  getAll(): Promise<T[]>;
  getOne(id: string): Promise<T | undefined>;
  create(data: D): Promise<number>;
  update(id: string, details: D): Promise<void>
  delete(id: string): Promise<void>
}

export interface Validator<T> {
  parse: (obj: T) => T;
}

export default class CRUD<T, D extends Record<string, string | number>> implements IRepo<T, D> {
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
    const db = await connect();
    if (!db) throw new Error('Couldnt get db');
    const rows = await db.query(`SELECT * from ${this.tableName}`).then((res) => res.rows);
    return rows.map(row => this.schema.parse(row));
  }

  async getOne(id: string): Promise<T | undefined> {
    const db = await connect();
    if (!db) throw new Error('Couldnt get db');
    const result = await db.query(`SELECT * from ${this.tableName} WHERE id = ${id}`);
    return this.schema.parse(result.rows[0]);
  }

  async create(data: D): Promise<number> {
    const db = await connect();
    if (!db) throw new Error('Couldnt get db');

    this.detailsSchema.parse(data);

    const columns = Object.keys(data);
    const values = Object.values(data);

    const query = `
    INSERT INTO ${this.tableName} (${columns.join(', ')})
    VALUES (${values.map((v) => `'${v}'`).join(',')})
    RETURNING id;`;
    const result = await db.query(query);

    return result.rows[0].id;
  }

  async update(id: string, details: D): Promise<void> {
    const db = await connect();
    if (!db) throw new Error('Couldnt get db');

    const query = {
      text: `
        UPDATE ${this.tableName} SET
          ${Object.keys(details).map((key) => {
            return `${key} = ${details[key]}`
          }).join(', ')}
        WHERE id = $1;`,
      values: [id]
    };

    await db.query(query);
  }

  async delete(id: string): Promise<void> {
    const db = await connect();
    if (!db) throw new Error('Couldnt get db');

    await db.query(`DELETE FROM ${this.tableName} WHERE id = ${id};`);
  }
}