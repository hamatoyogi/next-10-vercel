const {
    withModuleFederation,
    MergeRuntime,
  } = require("@module-federation/nextjs-mf");
  const path = require("path");
  
  module.exports = {
    webpack: (config, options) => {
      const { buildId, dev, isServer, defaultLoaders, webpack } = options;
      const mfConf = {
        name: "app1",
        library: { type: config.output.libraryTarget, name: "app1" },
        filename: "static/runtime/remoteEntry.js",
        remotes: {},
        exposes: {
            './Exposed': './components/Exposed',
        },
        shared: [],
      };
  
      // Configures ModuleFederation and other Webpack properties
      withModuleFederation(config, options, mfConf);
  
      config.plugins.push(new MergeRuntime());
  
      if (!isServer) {
        config.output.publicPath = process.env.PUBLIC_PATH;
      }
  
      return config;
    },
  };