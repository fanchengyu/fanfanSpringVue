const path = require('path')
// const defaultSettings = require('./src/settings.js')
// const CompressionPlugin = require('compression-webpack-plugin')
// const TerserPlugin = require('terser-webpack-plugin')
// console.log({ __dirname })
function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = 'SpringVUE'
const port = 9538 // dev port
module.exports = {
  publicPath: '/', // 部署应用包时的基本URL，默认'/'
  outputDir: 'dist', // build时构建的生产环境文件的目录,默认dist
  assetsDir: 'static', // 放置生成的静态资源的目录，相对于outputdir，即打好包的js图片css等文件在static里面 默认''
  indexPath: 'index.html', // 生成的index.html的输出路径默认为index.html
  filenameHashing: true, // 文件名哈希。 默认为true
  lintOnSave: /** process.env.NODE_ENV === 'development'*/ 'default', // 保存时使用eslint校验，开发环境启用,设为default时，lint错误会导致无法编译
  runtimeCompiler: true, // 是否启用运行时编译，默认false  开启true的话就可以在template中使用字符串模板，而不局限于.vue文件
  transpileDependencies: [], // 需要转译的node_modules里面的文件，通常情况不需要
  productionSourceMap: false, // 设置为true时，在生产环境浏览器控制台报错时可以看到源码
  devServer: {
    port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://106.52.98.247:8080/',
        changeOrigin: true,
        pathRewrite: {
          [`^${process.env.VUE_APP_BASE_API}`]: ''
        }
      }
    }
  },
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  /** webpack配置项 */
  configureWebpack: {
    // entry: './src', // 打包的入口，默认为./src
    name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '范范AND乐乐'
        return args
      })
  }
  // chainWebpack(config) {
  //   config.module
  //     .rule('vue')
  //     .use('vue-loader')
  //     .loader('vue-loader')
  //     .tap(options => {
  //       options.compilerOptions.preserveWhitespace = true
  //       return options
  //     })
  //     .end()
  //   config
  //     .when(process.env.NODE_ENV === 'development',
  //       config => config.devtool('cheap-source-map')
  //     )
  //   config
  //     .when(process.env.NODE_ENV !== 'development',
  //       config => {
  //         config
  //           .optimization.splitChunks({
  //             chunks: 'all',
  //             cacheGroups: {
  //               libs: {
  //                 name: 'chunk-libs',
  //                 test: /[\\/]node_modules[\\/]/,
  //                 priority: 10,
  //                 chunks: 'initial' // only package third parties that are initially dependent
  //               },
  //               elementUI: {
  //                 name: 'chunk-elementUI', // split elementUI into a single package
  //                 priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
  //                 test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
  //               },
  //               commons: {
  //                 name: 'chunk-commons',
  //                 test: resolve('src/components'), // can customize your rules
  //                 minChunks: 3, //  minimum common number
  //                 priority: 5,
  //                 reuseExistingChunk: true
  //               }
  //             }
  //           })
  //         config.optimization.runtimeChunk('single')
  //       }
  //     )
  // }
}
