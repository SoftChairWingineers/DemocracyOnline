const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = {
  mode: 'development',
  entry: path.resolve(SRC_DIR, 'client', 'index.jsx'),
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: DIST_DIR, // Serve from dist
    },
    hot: true,
    open: true,
    historyApiFallback: true,
    port: 4000,
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(SRC_DIR, 'client', 'index.html'),
      filename: 'index.html',
    }),
  ],
};
