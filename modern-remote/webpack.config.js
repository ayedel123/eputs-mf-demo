const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = {
    entry: "./src/index",
    mode: "development",
    devServer: {
        port: 3001,
        hot: true,
        open: true,
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "public"),
        },
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
    output: {
        publicPath: "http://localhost:3001/",
        filename: "[name].js",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: [
                        "@babel/preset-react",
                        "@babel/preset-typescript",
                    ],
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.svg$/,
                use: ["@svgr/webpack", "url-loader"],
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "remote_app",
            filename: "remoteEntry.js",
            exposes: {
                "./Button": "./src/components/Button",
            },
            shared: {
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                    eager: false,
                    shareScope: "default",
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: deps["react-dom"],
                    eager: false,
                    shareScope: "default",
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            favicon: "./public/favicon.ico",
        }),
    ],
};
