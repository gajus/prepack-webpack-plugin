// @flow

import ModuleFilenameHelpers from 'webpack/lib/ModuleFilenameHelpers';
import {
  RawSource
} from 'webpack-sources';
import {
  prepackSources
} from 'prepack';
import type {
  PluginConfigType,
  UserPluginConfigType
} from './types';

const defaultConfig = {
  prepack: {},
  test: /\.js($|\?)/i
};

export default class PrepackPlugin {
  config: PluginConfigType;

  constructor (userConfig?: UserPluginConfigType) {
    this.config = {
      ...defaultConfig,
      ...userConfig
    };
  }

  apply (compiler: Object) {
    const { config } = this;

    compiler.hooks.compilation.tap('PrepackPlugin', (compilation) => {
      compilation.hooks.optimizeChunkAssets.tap('PrepackPlugin', (chunks) => {
        chunks.forEach((chunk: Object) => {
          // prepack every file in chunk
          chunk.files.forEach((filePath) => {
            // check if file extension matches to config.test
            if (
              ModuleFilenameHelpers.matchObject({
                test: config.test
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
                  ...config.prepack
                }).code
              );
            }
          });
        });
      });
    });
  }
}
