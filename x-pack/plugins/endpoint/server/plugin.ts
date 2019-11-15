/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { Plugin, CoreSetup, PluginInitializerContext } from 'kibana/server';
import { Observable } from 'rxjs';
import { addResolverRoutes } from './routes';
import { EndpointConfigType } from './config';
import { EndpointDataAdapterFactory } from './adapters';

export class EndpointPlugin implements Plugin {
  private readonly config$: Observable<EndpointConfigType>;

  constructor(initializerContext: PluginInitializerContext) {
    this.config$ = initializerContext.config.create<EndpointConfigType>();
  }

  public async setup(core: CoreSetup) {
    const factory = new EndpointDataAdapterFactory(this.config$);
    const router = core.http.createRouter();
    addResolverRoutes(router, factory);
  }

  public start() {}
  public stop() {}
}
