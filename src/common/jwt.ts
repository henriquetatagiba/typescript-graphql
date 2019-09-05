import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'psiu!';

export class JWT {
  public static validateToken(token: string) {
    return jwt.verify(token, secret);
  }

  public static createToken(payload: any) {
    return jwt.sign(payload, secret);
  }
}
