import path from 'path';
import { Configuration } from 'webpack';
import merge from 'webpack-merge';

import commonConfig from './common';

const config: Configuration = {
  entry: path.resolve(__dirname, "../../src/server/index.tsx"),
  target: "node",
  externalsPresets: { node: true },
  output: {
    path: path.resolve(__dirname, "../../build"),
    filename: "server.js"
  }
}

export default merge<Configuration>(commonConfig, config);
