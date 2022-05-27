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

  async getAll() {
    return [];
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
