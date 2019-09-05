import { InputType, Field } from 'type-graphql';

@InputType()
export class LoginUserInput {
  @Field(() => String)
  public email: string;

  @Field(() => String)
  public password: string;
}
