/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { RequestHandlerContext } from 'kibana/server';
import { IEndpointDataAdapter } from './interface';

export class EndpointElasticsearchAdapter implements IEndpointDataAdapter {
  // @ts-ignore this should be used to actually grab elasticsearch clients, etc.
  private context: RequestHandlerContext;

  constructor(context: RequestHandlerContext) {
    this.context = context;
  }

  public async ResolveProcessTree(uniqueID: string, limits: { nodes: number; levels: number }) {
    throw new Error('Method not implemented.');
  }
}
