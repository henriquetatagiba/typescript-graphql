import { Request } from 'express';
import { userModel } from '../modules/users/user.model';
import { JWT } from './jwt';

export class Auth {
  public static getUser(req: Request) {
    const {
      headers: { authorization },
    } = req;

    if (authorization) {
      const token = authorization.replace('Bearer ', '');

      try {
        const decoded: any = JWT.validateToken(token);
        return userModel
          .findById(decoded)
          .orFail(() => new Error('Usuário não encontrado.'));
      } catch (e) {
        return null;
      }
    }
    return null;
  }
}
