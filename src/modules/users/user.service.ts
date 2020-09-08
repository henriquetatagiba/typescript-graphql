import { userModel, User } from './user.model';
import { CreateUserInput } from './inputs/createUser.input';
import { DocumentType } from '@typegoose/typegoose';
import { UpdateUserInput } from './inputs/updateUser.input';

export class UserService {
  constructor(private readonly userRepository = userModel) {}

  public async create(input: CreateUserInput): Promise<DocumentType<User>> {
    return this.userRepository.create<Partial<User>>({ ...input });
  }

  public async update(input: UpdateUserInput): Promise<DocumentType<User>> {
    const { id, ...data } = input;

    return this.userRepository.findByIdAndUpdate(id, data).orFail();
  }

  public async remove(id: string): Promise<DocumentType<User>> {
    return this.userRepository.findByIdAndRemove(id).orFail();
  }
}
