import { buildTypeDefsAndResolvers } from 'type-graphql';
import { authChecker } from './common/middlewares/authChecker';
import { UserResolver } from './modules/users/user.resolver';

export default buildTypeDefsAndResolvers({
  authChecker,
  resolvers: [UserResolver],
  emitSchemaFile: true,
  validate: false,
});
