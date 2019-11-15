/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { IEndpointDataAdapter } from './interface';

export class EndpointFixtureAdapter implements IEndpointDataAdapter {
  public async ResolveProcessTree(uniqueID: string, limits: { nodes: number; levels: number }) {
    throw new Error('Method not implemented.');
  }
}
