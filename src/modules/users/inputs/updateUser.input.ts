import { InputType, Field, ID } from 'type-graphql';
import { DocumentInput } from '../../../common/inputs/document.input';
import { AddressInput } from '../../../common/inputs/address.input';
import { PhoneInput } from '../../../common/inputs/phone.input';

@InputType()
export class UpdateUserInput {
  @Field(() => ID, {
    nullable: true,
    description: 'Admins can update other user by id',
  })
  public id: string;

  @Field(() => String)
  public name: string;

  @Field(() => String, { nullable: true })
  public password: string;
}
