/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import Boom from 'boom';
import { RequestHandlerContext } from 'kibana/server';
import { FindFileStructureResponse } from '../../../common/types/file_datavisualizer';

export type InputData = any[];

export interface InputOverrides {
  [key: string]: string;
}

export type FormattedOverrides = InputOverrides & {
  column_names: string[];
  has_header_row: boolean;
  should_trim_fields: boolean;
};

export interface AnalysisResult {
  results: FindFileStructureResponse;
  overrides?: FormattedOverrides;
}

export function fileDataVisualizerProvider(context: RequestHandlerContext) {
  async function analyzeFile(data: any, overrides: any): Promise<AnalysisResult> {
    let results = [];

    try {
      results = await context.ml!.mlClient.callAsCurrentUser('ml.fileStructure', {
        body: data,
        ...overrides,
      });
    } catch (error) {
      const err = error.message !== undefined ? error.message : error;
      throw Boom.badRequest(err);
    }

    const { hasOverrides, reducedOverrides } = formatOverrides(overrides);

    return {
      ...(hasOverrides && { overrides: reducedOverrides }),
      results,
    };
  }

  return {
    analyzeFile,
  };
}

function formatOverrides(overrides: InputOverrides) {
  let hasOverrides = false;

  const reducedOverrides: FormattedOverrides = Object.keys(overrides).reduce((acc, overrideKey) => {
    const overrideValue: string = overrides[overrideKey];
    if (overrideValue !== '') {
      if (overrideKey === 'column_names') {
        acc.column_names = overrideValue.split(',');
      } else if (overrideKey === 'has_header_row') {
        acc.has_header_row = overrideValue === 'true';
      } else if (overrideKey === 'should_trim_fields') {
        acc.should_trim_fields = overrideValue === 'true';
      } else {
        acc[overrideKey] = overrideValue;
      }

      hasOverrides = true;
    }
    return acc;
  }, {} as FormattedOverrides);

  return {
    reducedOverrides,
    hasOverrides,
  };
}
