import {
  DocumentType,
  Prop,
  Pre,
  getModelForClass,
  ModelOptions,
} from '@typegoose/typegoose';
import { Field, ObjectType, ID } from 'type-graphql';
import * as bcrypt from 'bcrypt';
import { Address } from '../../common/types/address.type';
import { Phone } from '../../common/types/phone.type';
import { Document } from '../../common/types/document.type';

export interface IUser extends DocumentType<User> {}

@ObjectType()
@Pre<User>('save', function (next) {
  if (this.password) {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);
  }
  next();
})
@ModelOptions({ schemaOptions: { timestamps: true } })
export class User {
  @Field(() => ID)
  public id: string;

  @Prop()
  @Field(() => String)
  public name: string;

  @Prop({ default: 'active' })
  @Field(() => String)
  public status: string;

  @Prop()
  @Field(() => String, { nullable: true })
  public email: string;

  @Prop()
  public password: string;

  @Field(() => String, { nullable: true })
  public token: string;

  @Prop({ default: 'user' })
  @Field(() => String)
  public role: string;

  @Prop(() => [Address])
  @Field(() => [Address], { nullable: true })
  public addresses: Address[];

  @Prop(() => [Phone])
  @Field(() => [Phone])
  public phones: Phone[];

  @Prop(() => [Document])
  @Field(() => [Document])
  public documents: Document[];

  @Field(() => Date)
  public createdAt: Date;

  @Field(() => Date)
  public updatedAt: Date;

  public hasRole(this: DocumentType<User>, ...roles: string[]) {
    if (roles.includes(this.role)) {
      return true;
    }
    return false;
  }
}

export const userModel = getModelForClass(User);
