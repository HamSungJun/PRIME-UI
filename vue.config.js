'use strict'

module.exports = {
  configureWebpack: {
    devServer: {
      disableHostCheck: true
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/styles/index.scss";
        `
      }
    }
  },
  runtimeCompiler: true,
  publicPath: '/'
}
