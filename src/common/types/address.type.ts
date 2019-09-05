import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Prop } from 'typegoose';

@ObjectType()
export class Address {
  @Field(() => ID)
  public id: string;

  @Prop()
  @Field(() => String)
  public country: string;

  @Prop()
  @Field(() => String)
  public state: string;

  @Prop()
  @Field(() => String)
  public city: string;

  @Prop()
  @Field(() => String)
  public street: string;

  @Prop()
  @Field(() => String)
  public streetNumber: string;

  @Prop()
  @Field(() => String)
  public zipcode: string;

  @Prop()
  @Field(() => String, { nullable: true })
  public neighborhood: string;

  @Prop()
  @Field(() => String, { nullable: true })
  public complementary: string;
}
