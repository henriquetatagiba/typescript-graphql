import 'reflect-metadata';
import '@tsed/swagger';
import './common/pipes';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import {
  Configuration,
  Inject,
  PlatformApplication,
  GlobalAcceptMimesMiddleware,
} from '@tsed/common';
import * as express from 'express';
import * as database from '../config/database';
import * as compress from 'compression';
import * as methodOverride from 'method-override';
import buildSchema from './app.module';
import { Auth } from './common/auth';

@Configuration({
  rootDir: __dirname,
  acceptMimes: ['application/json'],
  port: process.env.PORT || 4000,
  swagger: {
    path: '/docs',
  },
  mount: {
    '/api': '${rootDir}/modules/**/*.controller.ts',
  },
})
export class App {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  /**
   * This method let you configure the express middleware required by your application to works.
   * @returns {Server}
   */
  public async $beforeRoutesInit(): Promise<void | any> {
    const { typeDefs, resolvers } = await buildSchema;

    const schema = makeExecutableSchema({ typeDefs, resolvers });
    await database.connect();

    this.app
      .use(GlobalAcceptMimesMiddleware)
      .use(compress())
      .use(methodOverride())
      .use(express.json())
      .use(
        express.urlencoded({
          extended: true,
        })
      );

    const server = new ApolloServer({
      schema,
      uploads: {
        maxFiles: 10,
        maxFileSize: 1000000,
      },
      context: async ({ req }) => ({
        auth: await Auth.getUser(req),
      }),
      formatError: (err) => ({
        message: err.message,
        code: err.extensions && err.extensions.code,
        locations: err.locations,
        path: err.path,
        extensions: err.extensions && err.extensions.exception,
      }),
    });

    server.applyMiddleware({ app: this.app });
  }
}
