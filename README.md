# prepack-webpack-plugin

[![Travis build status](http://img.shields.io/travis/gajus/prepack-webpack-plugin/master.svg?style=flat-square)](https://travis-ci.org/gajus/prepack-webpack-plugin)
[![Coveralls](https://img.shields.io/coveralls/gajus/prepack-webpack-plugin.svg?style=flat-square)](https://github.com/gajus/prepack-webpack-plugin)
[![NPM version](http://img.shields.io/npm/v/prepack-webpack-plugin.svg?style=flat-square)](https://www.npmjs.org/package/prepack-webpack-plugin)
[![Canonical Code Style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)

A webpack plugin for [prepack](https://prepack.io/).

## Usage

1. Install `prepack-webpack-plugin`.
1. Add an instance of the plugin to the webpack [plugin configuration](https://webpack.js.org/configuration/plugins/).

### Configuration

|Name|Description|Default|
|---|---|---|
|`test`|A regex used to match the files.|`/\.js($|\?)/i`|
|`prepack`|Prepack configuration. See [Prepack documentation](https://prepack.io/getting-started.html#options).|

## Example

```js
import PrepackWebpackPlugin from 'prepack-webpack-plugin';

const configuration = {};

module.exports = {
  // ...
  plugins: [
    new PrepackWebpackPlugin(configuration)
  ]
};

```

> If you are using commonjs, you must explicitly reference the `.default` property of the module, e.g.
>
> ```js
> const PrepackWebpackPlugin = require('prepack-webpack-plugin').default;
> 
> const configuration = {};
> 
> module.exports = {
>   // ...
>   plugins: [
>     new PrepackWebpackPlugin(configuration)
>   ]
> };
>
> ```
