const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "gbubdd",
    projectName: "dtp-map",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    //mode: "development",
    mode: "production",
    devtool: false,
    entry: "./src/main.tsx",
    stats: { warnings: false },
    devServer: {
      hot: true,
    },
    output: {
      filename: "js/app.js",
    },
    module: {
      rules: [
        {
          test: /\.(png|jp(e*)g|svg|gif)$/,
          type: "asset/inline",
        },
      ],
    },
  });
};
