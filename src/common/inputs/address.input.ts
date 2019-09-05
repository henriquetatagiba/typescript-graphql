import { Field, InputType } from 'type-graphql';

@InputType()
export class AddressInput {
  @Field(() => String)
  public country: string;

  @Field(() => String)
  public state: string;

  @Field(() => String)
  public city: string;

  @Field(() => String)
  public street: string;

  @Field(() => String)
  public streetNumber: string;

  @Field(() => String)
  public zipcode: string;

  @Field(() => String, { nullable: true })
  public neighborhood: string;

  @Field(() => String, { nullable: true })
  public complementary: string;
}
