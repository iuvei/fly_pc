'use strict'
// Template version: 1.2.7
// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')
const target_url = "http://m51.cdn-ddos.com";
module.exports = {
  dev: {
    env: require('./dev.env'),
    port: process.env.PORT || 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    host:'192.168.0.222',
    proxyTable: {
      '/notice':{
        target:target_url,
        changeOrigin:true,
        pathRewrite:{
          '^/notice': '/notice'
        }
      },
      '/m5':{
        target:"http://pz.tunnel.qydev.com",
        changeOrigin:true,
        pathRewrite:{
          '^/m5': '/'
        }
      },
      '/api':{
      	target:"https://parg.co/api/shorten",
        changeOrigin:true,
        pathRewrite:{
          '^/api': ''
        }
      },
      '/zhifuxing':{
      	target:"http://www.zhifuxing.com/pay_star/game",
        changeOrigin:true,
        pathRewrite:{
          '^/zhifuxing': ''
        }
      }
      


        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',

        /**
         * Source Maps
         */

        productionSourceMap: true,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}