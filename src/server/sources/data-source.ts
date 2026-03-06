export interface DataSource<T> {
  getAll(): Promise<T[]>;
}
