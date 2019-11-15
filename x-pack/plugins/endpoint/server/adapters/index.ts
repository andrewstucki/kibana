/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { RequestHandlerContext } from 'kibana/server';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { IEndpointDataAdapter } from './interface';
import { EndpointConfigType } from '../config';
import { EndpointFixtureAdapter } from './fixture';
import { EndpointElasticsearchAdapter } from './elasticsearch';

export class EndpointDataAdapterFactory {
  private readonly config$: Observable<EndpointConfigType>;

  constructor(config$: Observable<EndpointConfigType>) {
    this.config$ = config$;
  }

  public async getAdapter(context: RequestHandlerContext): Promise<IEndpointDataAdapter> {
    const config = await this.config$.pipe(first()).toPromise();
    return config.useFixtures
      ? new EndpointFixtureAdapter()
      : new EndpointElasticsearchAdapter(context);
  }
}
