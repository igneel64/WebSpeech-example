/* eslint-disable */
const webpack = require("webpack");

export default (config, env, helpers) => {
  helpers.getLoadersByName(
    config,
    "css-loader"
  )[0].rule.loader[2].options.minify = true;

  // On production, mangle fully the classNames used by CSS Modules
  if (env.production) {
    const { loader: cssLoader } = helpers.getLoadersByName(
      config,
      "css-loader"
    )[0];
    cssLoader.options.localIdentName = "[sha1:hash:hex:4]";
    helpers.getLoadersByName(
      config,
      "css-loader"
    )[0].rule.loader[2].options.sourceMap = false;
  }
};
