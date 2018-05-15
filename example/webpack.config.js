const path = require('path')
const PrepackPlugin = require('../').default;


module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/index.js'),
    chunk: path.resolve(__dirname, 'src/chunk.js')
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
