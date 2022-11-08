import { Either, left, right } from '@core/logic/either';

import { CNPJ, CPF } from '../domain/valueObjects';

export class DocumentFactory {
  static create(document: string): Either<Error, CPF | CNPJ> {
    const documentWithOnlyDigits = document.replace(/\D/g, '');

    return documentWithOnlyDigits.length === 11
      ? this.createCpfDocument(document)
      : this.createCnpjDocument(document);
  }

  private static createCpfDocument(document: string): Either<Error, CPF> {
    const cpfOrError = CPF.create(document);

    if (cpfOrError.isLeft()) {
      return left(cpfOrError.value);
    }

    return right(cpfOrError.value);
  }

  private static createCnpjDocument(document: string): Either<Error, CNPJ> {
    const cnpjOrError = CNPJ.create(document);

    if (cnpjOrError.isLeft()) {
      return left(cnpjOrError.value);
    }

    return right(cnpjOrError.value);
  }
}
