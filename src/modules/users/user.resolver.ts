import {
  Query,
  Resolver,
  Mutation,
  Arg,
  Root,
  Ctx,
  Authorized,
  FieldResolver,
} from 'type-graphql';
import { User, userModel, IUser } from './user.model';
import { JWT } from '../../common/jwt';
import * as bcrypt from 'bcrypt';
import { UpdateUserInput } from './inputs/updateUser.input';
import { UserInvalid } from '../../common/errors';
import { LoginUserInput } from './inputs/loginUser.input';
import { CreateUserInput } from './inputs/createUser.input';
import { YupValidate } from '../../common/decorators/yupValidation';
import { createUserSchema } from './user.validation';

@Resolver(() => User)
export class UserResolver {
  @Authorized()
  @Query(() => User)
  public async me(@Ctx('auth') auth: IUser) {
    return userModel.findById(auth.id);
  }

  @Query(() => [User])
  public async users() {
    return userModel.find({});
  }

  @Mutation(() => User)
  public async updateUser(
    @Arg('input', () => UpdateUserInput) input: UpdateUserInput,
    @Ctx('auth') auth: IUser
  ) {
    const { id, ...data } = input;

    let userId = auth.id;
    if (auth.hasRole('admin') && input.id) {
      userId = input.id;
    }

    return userModel.findByIdAndUpdate(userId, data, {
      new: true,
    });
  }

  @Mutation(() => User)
  public async login(
    @Arg('input', () => LoginUserInput) input: LoginUserInput
  ) {
    return userModel.findOne({ email: input.email }).then(async user => {
      if (!user) throw new UserInvalid();

      return bcrypt.compare(input.password, user.password).then(res => {
        if (res) {
          user.token = JWT.createToken(user.toObject());

          return user;
        }
        throw new UserInvalid();
      });
    });
  }

  @YupValidate(createUserSchema)
  @Mutation(() => User)
  public async createUser(
    @Arg('input', () => CreateUserInput) input: CreateUserInput
  ) {
    return userModel.create(input).then(user => {
      user.token = JWT.createToken(user.toObject());

      return user;
    });
  }
}
