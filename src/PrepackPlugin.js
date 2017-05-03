// @flow

import constructRealm from 'prepack/lib/construct_realm';
import Serializer from 'prepack/lib/serializer';
import initializeGlobals from 'prepack/lib/globals';
import {
  getRealmOptions,
  getSerializerOptions
} from 'prepack/lib/options';
import ModuleFilenameHelpers from 'webpack/lib/ModuleFilenameHelpers';
import {
  RawSource
} from 'webpack-sources';

const defaultConfiguration = {
  prepack: {},
  test: /\.js($|\?)/i
};

type ConfigurationType = {
  prepack: Object,
  test: RegExp
};

const prepackCode = (filename: string, code: string, prepackConfiguration = {}) => {
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

export default class PrepackPlugin {
  configuration: ConfigurationType;

  constructor (userConfiguration: ConfigurationType) {
    this.configuration = {
      ...defaultConfiguration,
      ...userConfiguration
    };
  }

  apply (compiler: Object) {
    const configuration = this.configuration;

    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
        for (const chunk of chunks) {
          const files = chunk.files;

          for (const file of files) {
            const matchObjectConfiguration = {
              test: configuration.test
            };

            if (!ModuleFilenameHelpers.matchObject(matchObjectConfiguration, file)) {
              // eslint-disable-next-line no-continue
              continue;
            }

            const asset = compilation.assets[file];

            const code = asset.source();

            const prepackedCode = prepackCode(file, code, configuration.prepack);

            compilation.assets[file] = new RawSource(prepackedCode.code);
          }
        }

        callback();
      });
    });
  }
}
