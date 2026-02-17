const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const {
    ModuleFederationPlugin,
} = require("@module-federation/enhanced/webpack");
const deps = require("./package.json").dependencies;

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
        publicPath: "http://localhost:8080/",
    },
    devtool: "inline-source-map",
    devServer: {
        static: "./dist",
        hot: true,
        historyApiFallback: true,
        port: 8080,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true,
                        compilerOptions: {
                            noEmit: false,
                        },
                    },
                },
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            favicon: "./public/favicon.ico",
        }),
        new ModuleFederationPlugin({
            name: "host",
            remotes: {
                remote_app: "remote_app@http://localhost:3001/remoteEntry.js",
            },
            shared: {
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                    shareScope: "default",
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: deps["react-dom"],
                    shareScope: "default",
                },
            },
        }),
    ],
};
