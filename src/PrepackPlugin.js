// @flow

import ModuleFilenameHelpers from 'webpack/lib/ModuleFilenameHelpers';
import {
  RawSource
} from 'webpack-sources';
import {
  prepack
} from 'prepack';
import type {
  PluginConfigurationType,
  UserPluginConfigurationType
} from './types';

const defaultConfiguration = {
  prepack: {},
  test: /\.js($|\?)/i
};

const nonEntryChunkPreamble = '__assumeDataProperty(global, "webpackJsonp", __abstract("function"))';

const isEntryChunk = (chunk: Object) => {
  return chunk.hasRuntime() && chunk.isInitial();
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

            const code = isEntryChunk(chunk) ? asset.source() : `${nonEntryChunkPreamble}\n ${asset.source()}`;

            const prepackedCode = prepack(code, {
              ...configuration.prepack,
              filename: file
            });

            compilation.assets[file] = new RawSource(prepackedCode.code);
          }
        }

        callback();
      });
    });
  }
}
