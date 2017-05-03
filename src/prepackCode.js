// @flow

import constructRealm from 'prepack/lib/construct_realm';
import Serializer from 'prepack/lib/serializer';
import initializeGlobals from 'prepack/lib/globals';
import {
  getRealmOptions,
  getSerializerOptions
} from 'prepack/lib/options';
import type {
  PrepackConfigurationType
} from './types';

export default (filename: string, code: string, prepackConfiguration: PrepackConfigurationType = {}) => {
  const realm = constructRealm(getRealmOptions(prepackConfiguration));

  initializeGlobals(realm);

  const serializer = new Serializer(
    realm,
    getSerializerOptions(prepackConfiguration)
  );

  // @todo Add source map support.
  const sourceMap = '';

  const serialized = serializer.init(filename, code, sourceMap, prepackConfiguration.sourceMaps);

  if (!serialized) {
    throw new Error('Unexpected state.');
  }

  return serialized;
};
