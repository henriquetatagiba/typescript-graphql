import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Prop } from '@typegoose/typegoose';

@ObjectType()
export class Phone {
  @Field(() => ID)
  public id: string;

  @Prop()
  @Field(() => String)
  public type: string;

  @Prop()
  @Field(() => String)
  public number: string;
}
