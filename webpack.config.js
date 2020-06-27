var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.sass$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(gif|svg|jpg|png)$/, loader: 'file-loader' }
    ]
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    // new CopyPlugin([
    //   {
    //     from: path.resolve(__dirname, 'src/imagenes'),
    //     to: path.resolve(__dirname, 'dist/imagenes')
    //   }
    // ]),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/imagenes'),
          to: path.resolve(__dirname, 'dist/imagenes')
        }
      ]
    })
  ]
}
