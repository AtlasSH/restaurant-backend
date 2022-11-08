export abstract class DomainError extends Error {
  private _name: string;
  private _message: string;
  private _context: string;
  private _code: string;

  constructor(props: DomainErrorProps) {
    super(props.message);
    this._name = props.name;
    this._message = props.message;
    this._context = props.context;
    this._code = props.code;
  }

  get context() {
    return this._context;
  }

  get name() {
    return this._name;
  }

  get values() {
    return {
      name: this._name,
      message: this._message,
      context: this._context,
      code: this._code,
    };
  }
}

type DomainErrorProps = {
  name: string;
  message: string;
  context: string;
  code: string;
};
