/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

export type ProcessTree = any;

// An IEndpointDataAdapter acts as a wrapper to actual elasticsearch queries that we'll need to execute against the stack
// it's the route's job to stitch all of these together into the API contract we respond with
export interface IEndpointDataAdapter {
  ResolveProcessTree(uniqueID: string, limits: { nodes: number; levels: number }): ProcessTree;
}
