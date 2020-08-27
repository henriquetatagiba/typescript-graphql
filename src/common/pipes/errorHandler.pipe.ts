import {
  Err,
  GlobalErrorHandlerMiddleware,
  OverrideProvider,
  Req,
  Res,
} from '@tsed/common';

@OverrideProvider(GlobalErrorHandlerMiddleware)
export class ErrorHandlerPipe extends GlobalErrorHandlerMiddleware {
  use(@Err() error: any, @Req() request: Req, @Res() response: Res): any {
    if (error) {
      response.status(error.status).json(error);
    }

    return super.use(error, request, response);
  }
}
