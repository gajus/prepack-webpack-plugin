// @flow

import ModuleFilenameHelpers from 'webpack/lib/ModuleFilenameHelpers';
import {
  RawSource
} from 'webpack-sources';
import {
  prepackSources
} from 'prepack';
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

  constructor (userConfiguration?: UserPluginConfigurationType) {
    this.configuration = {
      ...defaultConfiguration,
      ...userConfiguration
    };
  }

  apply (compiler: Object) {
    const {configuration} = this;

    compiler.hooks.compilation.tap('PrepackPlugin', (compilation) => {
      compilation.hooks.optimizeChunkAssets.tap('PrepackPlugin', (chunks) => {
        chunks.forEach((chunk: Object) => {
          // prepack every file in chunk
          chunk.files.forEach((filePath) => {
            // check if file extension matches to configuration.test
            if (
              ModuleFilenameHelpers.matchObject({
                test: configuration.test
              }, filePath)
            ) {
              // prepack and apply changes
              compilation.assets[filePath] = new RawSource(
                prepackSources([
                  {
                    fileContents: compilation.assets[filePath].source(),
                    filePath
                  }
                ], {
                  ...configuration.prepack
                }).code
              );
            }
          });
        });
      });
    });
  }
}
