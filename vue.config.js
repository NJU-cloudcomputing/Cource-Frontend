module.exports = {
  lintOnSave: false,
  configureWebpack() {
    return {
      resolve: {
        fallback: {
          http: require.resolve("stream-http"),
        },
      },
    };
  },
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:9090",
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      },
    },
  },
};
