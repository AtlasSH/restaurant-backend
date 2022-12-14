import { UniqueEntityID } from './unique-entity-id';

const isValueObject = (v: any): v is ValueObject<any> => {
  return v instanceof ValueObject;
};

export abstract class ValueObject<Props> {
  protected readonly _id: UniqueEntityID;
  public readonly props: Props;

  constructor(props: Props, id?: UniqueEntityID | null) {
    if (id === null) {
      this._id = null;
    } else {
      this._id = id || new UniqueEntityID();
    }

    this.props = props;
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  public equals(object?: ValueObject<Props>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isValueObject(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }
}
