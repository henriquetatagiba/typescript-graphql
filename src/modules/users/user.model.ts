import {
  DocumentType,
  Prop,
  Pre,
  getModelForClass,
  ModelOptions,
} from '@typegoose/typegoose';
import { Field, ObjectType, ID } from 'type-graphql';
import * as bcrypt from 'bcrypt';
import { Status } from './enums/status.enum';
import { Role } from './enums/role.enum';

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

  @Prop({ default: Status.active })
  @Field(() => Status)
  public status: Status;

  @Prop()
  @Field(() => String, { nullable: true })
  public email: string;

  @Prop()
  public password: string;

  @Field(() => String, { nullable: true })
  public token: string;

  @Prop({ default: Role.user })
  @Field(() => Role)
  public role: Role;

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
