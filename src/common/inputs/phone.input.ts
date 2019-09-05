import { Field, InputType } from 'type-graphql';
import { prop as Prop } from 'typegoose';

@InputType()
export class PhoneInput {
  @Field(() => String)
  public type: string;

  @Field(() => String)
  public number: string;
}
