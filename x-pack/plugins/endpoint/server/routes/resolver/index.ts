/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { IRouter } from 'kibana/server';
import { resolveProcessTree } from './resolve_process_tree';
import { EndpointDataAdapterFactory } from '../../adapters';
import { resolveProcessTreeRequest, resolveProcessTreePath } from '../../../common/api';

export function addResolverRoutes(router: IRouter, factory: EndpointDataAdapterFactory) {
  router.get(
    {
      path: resolveProcessTreePath,
      validate: {
        body: resolveProcessTreeRequest,
      },
    },
    resolveProcessTree(factory)
  );
}
