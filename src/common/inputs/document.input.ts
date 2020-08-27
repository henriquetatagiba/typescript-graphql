import { Field, InputType } from 'type-graphql';

@InputType()
export class DocumentInput {
  @Field(() => String)
  public type: string;

  @Field(() => String)
  public number: string;
}
