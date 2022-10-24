export default class Identifier<T> {
  private _value: T;

  constructor(id: T) {
    this._value = id;
  }

  get value(): T {
    return this._value;
  }

  equals(id?: Identifier<T>): boolean {
    if (id === null || id === undefined) {
      return false;
    }

    if (!(id instanceof this.constructor)) {
      return false;
    }

    return id.value === this._value;
  }

  toString() {
    return String(this._value);
  }
}
