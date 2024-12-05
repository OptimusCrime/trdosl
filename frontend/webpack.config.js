const path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  FaviconsWebpackPlugin = require('favicons-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  Dotenv = require('dotenv-webpack');

const buildPath = path.join(__dirname, 'build');
const sourcePath = path.join(__dirname, 'src');

module.exports = () => {
  return {
    entry: './index.tsx',
    context: sourcePath,
    output: {
      clean: true,
      filename: 'static/[name].[contenthash].js',
      path: buildPath,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.json', '.js', '.jsx'],
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist'),
      },
      port: 3000,
      open: true,
      hot: true,
      compress: true,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(png|site\.webmanifest|svg|icon|xml)$/i,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      ],
    },
    plugins: [
      new Dotenv(),
      new FaviconsWebpackPlugin({
        logo: path.join(__dirname, 'src', 'fav', 'app-icon.png'),
        prefix: 'static/fav/',
        favicons: {
          appName: 'NOREG',
          start_url: '/',
          appDescription: 'NOREG',
          background: '#ff6e6e',
          theme_color: '#ff6e6e',
          developerName: 'OptimusCrime',
          developerURL: null,
        },
      }),
      new HtmlWebpackPlugin({
        template: path.join(sourcePath, 'index.html'),
        path: buildPath,
        filename: 'index.html',
        inject: 'head',
      }),
      new MiniCssExtractPlugin({
        filename: 'static/[name].[contenthash].css',
      }),
    ],
  };
};
