import { Either } from '@core/logic/either';

export interface IValidation {
  validate: (input: any) => Either<Error, null>;
}
