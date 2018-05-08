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

          const sources = files.map(file => {
            const matchObjectConfiguration = {
              test: configuration.test
            };

            if (!ModuleFilenameHelpers.matchObject(matchObjectConfiguration, file)) {
              // eslint-disable-next-line no-continue
              continue;
            }

            const asset = compilation.assets[file];

            const code = isEntryChunk(chunk) ? asset.source() : `${nonEntryChunkPreamble}\n ${asset.source()}`;
            
            return {
              filePath: file,
              fileContents: code
            }
          })
          
          const prepackedCode = prepackSources(sources, {
            ...configuration.prepack
          });
          
          prepackedCode.forEach(({ code }, index) => {
            const file = sources[index].filePath;
            compilation.assets[file] = new RawSource(code);
          })
        }

        callback();
      });
    });
  }
}
