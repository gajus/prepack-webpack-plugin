// @flow

import test from 'ava';
import PrepackPlugin from '../src/PrepackPlugin';

test('initializes default configuration', (t) => {
  const prepackPlugin = new PrepackPlugin();

  t.deepEqual(prepackPlugin.config, {
    prepack: {},
    test: /\.js($|\?)/i
  });
});
