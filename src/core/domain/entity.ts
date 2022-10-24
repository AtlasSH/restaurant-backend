import { IBaseDomainEntity } from '@core/infra/protocols/layer/base-entity.interface';

import UniqueEntityID from './unique-entity-id';

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

export abstract class Entity<Props extends IBaseDomainEntity> {
  protected readonly _id: UniqueEntityID;
  public readonly props: Props;

  constructor(props: Props, id?: UniqueEntityID) {
    this._id = id ? id : new UniqueEntityID();

    this.props = Object.assign(props, {
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get createdAt(): Date {
    return this.props.createdAt ?? new Date();
  }

  get updatedAt(): Date {
    return this.props.updatedAt ?? new Date();
  }

  get isDeleted(): boolean {
    return this.props.isDeleted ?? false;
  }

  public equals(object?: Entity<Props>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }
}
