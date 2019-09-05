import * as yup from 'yup';
import { createMethodDecorator } from 'type-graphql';
import { IUser } from '../../modules/users/user.model';

interface IContext {
  auth: IUser;
}

export function YupValidate(
  schema: (auth?: IUser) => yup.Schema<any>
): MethodDecorator {
  return createMethodDecorator<IContext>(
    async ({ args, context: { auth } }, next) => {
      const { input } = args;

      await schema(auth).validate(input, { abortEarly: false });
      return next();
    }
  );
}
