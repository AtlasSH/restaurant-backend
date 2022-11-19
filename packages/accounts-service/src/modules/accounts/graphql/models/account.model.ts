import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Account')
export class AccountModel {
  @Field(() => ID)
  id: string;

  @Field()
  document: string;
}
