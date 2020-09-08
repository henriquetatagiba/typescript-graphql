import { InputType, Field } from 'type-graphql';
import { DocumentInput } from '../../../common/inputs/document.input';
import { PhoneInput } from '../../../common/inputs/phone.input';
import { AddressInput } from '../../../common/inputs/address.input';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  public name: string;

  @Field(() => String)
  public email: string;

  @Field(() => String)
  public password: string;
}
