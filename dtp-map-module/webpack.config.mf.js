const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  entry: "./src/bootstrap-mf.tsx",
  output: {
    path: path.resolve(__dirname, "dist-mf"),
    filename: "[name].js",
    publicPath: "http://localhost:3002/",
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
          },
        },
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "dtpMapRemote",
      filename: "remoteEntry.js",
      exposes: {
        "./bootstrap": "./src/bootstrap-mf.tsx",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: "17.0.0",
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "17.0.0",
        },
      },
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    historyApiFallback: true,
    port: 3002,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};
