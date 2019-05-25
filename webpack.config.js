const path = require('path')
const html = require('html-webpack-plugin')
const MiniCss = require('mini-css-extract-plugin')
const SioNoproduccion = process.env.NODE_ENV !== 'produccion'

module.exports = {
  entry: './Frontend/app.js',
  output: {
    path: path.join(__dirname, 'Backend/public'),
    filename: 'js/bundle.js'
  },
  mode: SioNoproduccion ? 'development' : 'production',
  module: {
    rules: [{
      test: /\.css/,
      use: [
        SioNoproduccion ? 'style-loader' : MiniCss.loader,
        'css-loader'
      ]
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img'
          }
        }
      ]
    }]
  },

  plugins: [
    new MiniCss({
      filename: 'css/bundle.css'
    }),
    new html({
      template: './Frontend/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    })
  ],
  devtool: 'source-map'

}
