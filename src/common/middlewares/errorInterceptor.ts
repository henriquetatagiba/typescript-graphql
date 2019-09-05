import { MiddlewareFn } from 'type-graphql';
import { GraphQLError } from 'graphql';

export const ErrorInterceptor: MiddlewareFn<any> = async (
  { context, info },
  next
) => {
  try {
    return await next();
  } catch (err) {
    throw err;
  }
};
