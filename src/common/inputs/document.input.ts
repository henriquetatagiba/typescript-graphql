import { Field, InputType } from 'type-graphql';
import { prop as Prop } from 'typegoose';

@InputType()
export class DocumentInput {
  @Field(() => String)
  public type: string;

  @Field(() => String)
  public number: string;
}
