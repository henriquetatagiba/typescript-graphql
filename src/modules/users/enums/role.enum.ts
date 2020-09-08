import { registerEnumType } from 'type-graphql';

export enum Role {
  admin = 'admin',
  manager = 'manager',
  user = 'user',
}

registerEnumType(Role, {
  name: 'UserRole',
});
