/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import { ResolverData } from '../../../common/types';
import { EventBuilder } from './event_builder.test';

export class Phase1Builder implements EventBuilder {
  constructor(public readonly entityID: string, public readonly parentEntityID: string) {}
  buildEvent(): ResolverData {
    return {
      event: {
        category: 'process',
        type: 'start',
      },
      endpoint: {
        process: {
          entity_id: this.entityID,
          parent: {
            entity_id: this.parentEntityID,
          },
        },
      },
    };
  }
  startingChildrenEntityID(): number {
    return 0;
  }
}
