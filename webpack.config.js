const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
let path = require('path');

module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '/dist'),
          },
        compress: true,
        port: 4000,
    },
    plugins: [
        new HTMLPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      }    
};