import { registerEnumType } from 'type-graphql';

export enum Status {
  active = 'active',
  disabled = 'disabled',
}

registerEnumType(Status, {
  name: 'UserStatus',
});
