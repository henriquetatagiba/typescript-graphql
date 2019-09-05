import { Field, ObjectType, ID } from 'type-graphql';
import {
  prop as Prop,
  pre as Pre,
  Typegoose,
  Ref,
  instanceMethod,
  InstanceType,
  arrayProp as ArrayProp,
  staticMethod,
  ModelType,
} from 'typegoose';
import * as bcrypt from 'bcrypt';
import { Address } from '../../common/types/address.type';
import { Phone } from '../../common/types/phone.type';
import { Document } from '../../common/types/document.type';

export interface IUser extends InstanceType<User> {}

@ObjectType()
@Pre<User>('save', function(next) {
  if (this.password) {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);
  }
  next();
})
export class User extends Typegoose {
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

  @ArrayProp({ items: Address })
  @Field(() => [Address], { nullable: true })
  public addresses: Address[];

  @ArrayProp({ items: Phone })
  @Field(() => [Phone])
  public phones: Phone[];

  @ArrayProp({ items: Document })
  @Field(() => [Document])
  public documents: Document[];

  @Field(() => Date)
  public createdAt: Date;

  @Field(() => Date)
  public updatedAt: Date;

  public hasRole(this: InstanceType<User>, ...roles: string[]) {
    if (roles.includes(this.role)) {
      return true;
    }
    return false;
  }
}

export const userModel = new User().getModelForClass(User, {
  schemaOptions: { timestamps: true },
});
