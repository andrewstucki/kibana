/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { schema, TypeOf } from '@kbn/config-schema';

export const resolveProcessTreePath = '/api/v1/endpoint/resolve';
export const resolveProcessTreeRequest = schema.object({
  uniqueId: schema.string(),
  limits: schema.object({
    nodes: schema.number(),
    levels: schema.number(),
  }),
});
export type ResolveProcessTreeRequest = TypeOf<typeof resolveProcessTreeRequest>;
