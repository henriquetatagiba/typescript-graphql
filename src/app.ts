import '@tsed/swagger';
import './common/pipes';
import {
  Configuration,
  Inject,
  PlatformApplication,
  GlobalAcceptMimesMiddleware,
} from '@tsed/common';
import * as express from 'express';
import * as cors from 'cors';
import * as compress from 'compression';
import * as methodOverride from 'method-override';
import * as database from '../config/database';
import { Auth } from './common/auth';
import { authChecker } from './common/middlewares/authChecker';

@Configuration({
  rootDir: __dirname,
  acceptMimes: ['application/json'],
  port: process.env.PORT || 4000,
  httpsPort: false,
  swagger: {
    path: '/docs',
  },
  componentsScan: [
    '${rootDir}/modules/**/*.resolver.ts',
    '${rootDir}/modules/**/*.model.ts',
    '${rootDir}/modules/**/*.service.ts',
  ],
  graphql: {
    server1: {
      path: '/graphql',
      serverConfig: {
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
      },
      buildSchemaOptions: {
        authChecker,
        emitSchemaFile: true,
        validate: false,
      },
    },
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
    await database.connect();

    this.app
      .use(GlobalAcceptMimesMiddleware)
      .use(cors())
      .use(compress())
      .use(methodOverride())
      .use(express.json())
      .use(
        express.urlencoded({
          extended: true,
        })
      );
  }

  // public $onMountingMiddlewares(): void {
  //   this.app.use(GlobalBasicAuthMiddleware);
  // }
}
