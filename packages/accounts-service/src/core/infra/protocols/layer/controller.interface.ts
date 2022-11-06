export interface IController<T = unknown, R = unknown> {
  handle(request: T): Promise<R>;
}
