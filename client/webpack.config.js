const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      // This is the main entry point for your application
      main: "./src/js/index.js",
      // This is the entry point for the install button
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
      // This will delete all files inside the `dist` folder before rebuilding it
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Ultimate Text Editor",
      }),
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      new WebpackPwaManifest({
        // fingerprints will cause issues with the service worker caching
        // of the manifest.json file, so we disable it
        fingerprints: false,
        // inject will inject the manifest into the HTML template
        // so we don't need to add the link to the manifest.json file
        inject: true,
        name: "Ultimate Text Editor",
        short_name: "Editor",
        description: "The Ultimate Text Editor",
        background_color: "#19c0cc",
        theme_color: "#000000",
        start_url: "./",
        publicPath: "./",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
