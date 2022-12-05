export interface IResolver<T = unknown, R = unknown> {
  handle(data: T): Promise<R>;
}
