import { ObjectType, Field } from 'type-graphql';
import { prop as Prop } from 'typegoose';

@ObjectType()
export class Document {
  @Prop()
  @Field(() => String)
  public type: string;

  @Prop()
  @Field(() => String)
  public number: string;
}
