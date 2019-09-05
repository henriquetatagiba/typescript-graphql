import { ObjectType, Field } from 'type-graphql';
import { prop as Prop } from 'typegoose';

@ObjectType()
export class Phone {
  @Prop()
  @Field(() => String)
  public type: string;

  @Prop()
  @Field(() => String)
  public number: string;
}
