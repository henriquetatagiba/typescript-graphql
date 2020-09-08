import { Query, Resolver, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import { User, userModel, IUser } from './user.model';
import { JWT } from '../../common/jwt';
import * as bcrypt from 'bcrypt';
import { UpdateUserInput } from './inputs/updateUser.input';
import { UserInvalid } from '../../common/errors';
import { LoginUserInput } from './inputs/loginUser.input';
import { CreateUserInput } from './inputs/createUser.input';
import { DocumentType } from '@typegoose/typegoose';
import { Inject } from '@tsed/di';
import { UserService } from './user.service';
import { ResolverService } from '@tsed/graphql';

@ResolverService(User)
export class UserResolver {
  @Inject()
  private readonly userService: UserService;

  @Authorized()
  @Query(() => User)
  public async me(@Ctx('auth') auth: IUser) {
    return userModel.findById(auth.id);
  }

  @Query(() => [User])
  public async users() {
    return userModel.find({});
  }

  @Authorized()
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
    return userModel.findOne({ email: input.email }).then(async (user) => {
      if (!user) throw new UserInvalid();

      return bcrypt.compare(input.password, user.password).then((res) => {
        if (res) {
          user.token = JWT.createToken(user.toObject());

          return user;
        }
        throw new UserInvalid();
      });
    });
  }

  @Mutation(() => User)
  public async createUser(
    @Arg('input', () => CreateUserInput) input: CreateUserInput
  ) {
    const user = await this.userService.create(input);

    return this.parseLoginResponse(user);
  }

  private async parseLoginResponse(user: DocumentType<User>) {
    user.token = JWT.createToken(user.toObject());

    return user;
  }
}
