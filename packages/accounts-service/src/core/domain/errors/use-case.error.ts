export abstract class UseCaseError extends Error {
  private _name: string;
  private _message: string;
  private _code: string;

  constructor(props: UseCaseErrorProps) {
    super(props.message);
    this._name = props.name;
    this._message = props.message;
    this._code = props.code;
  }

  get name() {
    return this._name;
  }

  get values() {
    return {
      name: this._name,
      message: this._message,
      code: this._code,
    };
  }
}

type UseCaseErrorProps = {
  name: string;
  message: string;
  code: string;
};
