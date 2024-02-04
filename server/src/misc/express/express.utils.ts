import { Request } from 'express';
import _ from 'lodash';
import { RequestContext } from './index';

export const expressUtils = {
  mergeContext(request: Request, partialContext: Partial<RequestContext>) {
    if (!request.context) {
      request.context = {};
    }

    request.context = _.merge(request.context, partialContext);
  },

  addLoggerContext(req: Request, loggerContext: unknown) {
    const mergedLoggerContext = _.merge(
      req?.context?.loggerContext ?? {},
      loggerContext,
    );

    this.mergeContext(req, {
      loggerContext: mergedLoggerContext,
    });
  },
};
