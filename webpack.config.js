var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const { InjectManifest } = require('workbox-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = env => {
  console.log('TIPO', env.TIPO)
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index_bundle.js',
      publicPath: '/'
    },
    devtool: env.TIPO === 'local' ? 'source-map' : false,
    // devtool: false,
    // devtool: 'cheap-module-eval-source-map',
    devServer: {
      port: 9000,
      historyApiFallback: true
      // contentBase: './',
      // hot: true
    },
    node: {
      fs: 'empty'
    },
    module: {
      rules: [
        { test: /\.(js)$/, include: path.resolve(__dirname, 'src'), use: 'babel-loader' },
        { test: /\.css$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
        { test: /\.sass$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
        { test: /\.(gif|svg|jpg|png)$/, loader: 'file-loader' }
      ]
    },
    mode: env.TIPO === 'local' ? 'development' : 'production',
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),
      new webpack.DefinePlugin({
        GLOBAL_URL: JSON.stringify(env.TIPO === 'local' ? 'http://localhost:8080/' : 'https://ivanf.net/')
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/manifest.json'),
            to: path.resolve(__dirname, 'dist/manifest.json')
          },
          {
            from: path.resolve(__dirname, 'robots.txt'),
            to: path.resolve(__dirname, 'dist/robots.txt')
          },
          {
            from: path.resolve(__dirname, 'src/imagenes'),
            to: path.resolve(__dirname, 'dist/imagenes')
          }
        ]
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'sw.js'
      })
    ]
  }
}
