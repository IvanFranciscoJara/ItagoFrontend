var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = env => {
  console.log('TIPO', env.TIPO)
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index_bundle.js'
    },
    devtool: '#eval-source-map',
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
      new webpack.DefinePlugin({
        GLOBAL_URL: JSON.stringify(env.TIPO === 'local' ? 'http://localhost:3005/' : 'https://ivanf.net/')
      }),
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
}
