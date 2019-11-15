/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { KibanaResponseFactory, KibanaRequest, RequestHandlerContext } from 'kibana/server';
import { EndpointDataAdapterFactory } from '../../adapters';
import { ResolveProcessTreeRequest } from '../../../common/api';

export function resolveProcessTree(factory: EndpointDataAdapterFactory) {
  return async (
    context: RequestHandlerContext,
    req: KibanaRequest<unknown, unknown, ResolveProcessTreeRequest>,
    res: KibanaResponseFactory
  ) => {
    const adapter = await factory.getAdapter(context);

    const { uniqueId, limits } = req.body;
    const processTree = await adapter.ResolveProcessTree(uniqueId, limits);
    // do whatever error handling stuff here
    return res.ok({ body: processTree });
  };
}
