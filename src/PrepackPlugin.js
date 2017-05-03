// @flow

import ModuleFilenameHelpers from 'webpack/lib/ModuleFilenameHelpers';
import {
  RawSource
} from 'webpack-sources';
import prepackCode from './prepackCode';
import type {
  PluginConfigurationType,
  UserPluginConfigurationType
} from './types';

const defaultConfiguration = {
  prepack: {},
  test: /\.js($|\?)/i
};

export default class PrepackPlugin {
  configuration: PluginConfigurationType;

  constructor (userConfiguration: UserPluginConfigurationType) {
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
