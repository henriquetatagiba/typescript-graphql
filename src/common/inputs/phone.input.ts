import { Field, InputType } from 'type-graphql';

@InputType()
export class PhoneInput {
  @Field(() => String)
  public type: string;

  @Field(() => String)
  public number: string;
}
