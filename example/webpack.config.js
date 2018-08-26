const path = require('path')
const PrepackPlugin = require('../').default;


module.exports = {
  entry: {
    'hello-world': path.resolve(__dirname, 'src/hello-world.js'),
    'abstraction': path.resolve(__dirname, 'src/abstraction.js'),
    'fibonacci': path.resolve(__dirname, 'src/fibonacci.js'),
    'modules': path.resolve(__dirname, 'src/modules.js'),
    'branching': path.resolve(__dirname, 'src/branching.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new PrepackPlugin()
  ],
  devtool: 'cheap-module-source-map',
};
