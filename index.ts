import 'dotenv/config';
import { $log } from '@tsed/common';
import { PlatformExpress } from '@tsed/platform-express';
import { App } from './src/app';

async function bootstrap() {
  try {
    $log.debug('Start server...');
    const platform = await PlatformExpress.bootstrap(App);

    await platform.listen();
    $log.debug('Server initialized');
  } catch (er) {
    $log.error(er);
  }
}

bootstrap();
