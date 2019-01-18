import * as path from 'path';
import { Configuration } from 'webpack';
import * as nodeExternals from 'webpack-node-externals';
import * as merge from 'webpack-merge';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import * as webpack from 'webpack';

const isDevelopment = process.env.NODE_ENV !== 'production';
const sourcePath = path.resolve(__dirname, 'src');

const config: Configuration = {
  mode: isDevelopment ? 'development' : 'production',
  entry: {
    SoundFont2: path.resolve(sourcePath, 'index.ts')
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    library: 'SoundFont2'
  },
  resolve: {
    extensions: ['.ts'],
    plugins: [new TsconfigPathsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@babel/preset-env', '@babel/preset-typescript'],
              plugins: ['@babel/plugin-proposal-class-properties']
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'inline-source-map'
};

/**
 * Create a bundle for web browsers.
 */
const browser: Configuration = merge.smart(config, {
  target: 'web',
  output: {
    libraryTarget: 'umd',
    umdNamedDefine: true,
    filename: '[name].js'
  },
  optimization: {
    minimize: true
  }
});

/**
 * Create a bundle for Node.js.
 */
const node: Configuration = merge.smart(config, {
  target: 'node',
  externals: [nodeExternals()],
  output: {
    libraryTarget: 'commonjs2',
    filename: '[name].node.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      TextDecoder: ['util', 'TextDecoder']
    })
  ]
});

export default [browser, node];
