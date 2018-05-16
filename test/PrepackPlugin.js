// @flow

import test from 'ava';
import PrepackPlugin from '../src/PrepackPlugin';

test('initializes default configuration', (t) => {
  const prepackPlugin = new PrepackPlugin();

  t.deepEqual(prepackPlugin.configuration, {
    prepack: {},
    test: /\.js($|\?)/i
  });
});
