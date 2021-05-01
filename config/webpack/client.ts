import path from 'path';
import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import merge from 'webpack-merge';

import commonConfig from './common';

const config: Configuration = {
  entry: path.resolve(__dirname, "../../src/client/index.tsx"),
  target: "web",
  output: {
    path: path.resolve(__dirname, "../../build/public"),
    filename: "bundle.js"
  }
}

export default merge<Configuration>(commonConfig, config);
