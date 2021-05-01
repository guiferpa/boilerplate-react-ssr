import { Configuration } from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const config: Configuration = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: {
          loader: '@svgr/webpack'
        }
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { useBuiltIns: "usage", corejs: 3 }],
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: [
              ["babel-plugin-styled-components", { ssr: true }]
            ]
          },
        }
      }
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({ async: false })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }
}

export default config;
