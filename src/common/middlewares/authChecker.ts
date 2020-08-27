import { AuthChecker } from 'type-graphql';
import { User } from '../../modules/users/user.model';
import { DocumentType } from '@typegoose/typegoose';

export interface IAuth {
  auth: DocumentType<User>;
}

export const authChecker: AuthChecker<IAuth> = (
  { context: { auth } },
  roles
) => {
  if (roles.length === 0) {
    return auth !== null;
  }

  if (!auth) {
    return false;
  }

  if (roles.includes(auth.role)) {
    return true;
  }

  return false;
};
