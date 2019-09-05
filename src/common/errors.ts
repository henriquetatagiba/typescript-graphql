export class UserInvalid extends Error {
  constructor() {
    super('Usuário ou senha incorreta.');
  }
}
