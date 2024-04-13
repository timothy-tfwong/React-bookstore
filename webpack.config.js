const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");

module.exports = {
    //inform creating a bundel for node js
   
    resolve: {
      extensions: [".tsx", ".ts", ".js",'.scss','.css'],
    },
    target: "node",
    entry: ["@babel/polyfill", "./server.ts"],
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "build"),
    },
    externals: [webpackNodeExternals()],
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader"
            
          ],
        },
        {
          test: /\.css$/i,
          
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(js|(j|t)sx?)$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            presets: [
              "@babel/react",
              "@babel/preset-typescript",
              [
                "@babel/env",
                {
                  targets: {
                    browsers: ["last 2 versions"],
                  },
                },
              ],
            ],
          },
        },
      ],
    },
  };