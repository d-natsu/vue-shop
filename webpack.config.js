const path = require('path');
// const webpack = require('webpack')
const htmlWebpack = require('html-webpack-plugin');
// 其实就是 js 文件，通过 node 中的模块操作，向外暴露配置对象
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
  entry: path.join(__dirname, './src/main.js'),// 表示要使用 webpack 打包的文件
  output:{
    path:path.join(__dirname, './dist'), // 指定打包文件输出路径
    filename:'bundle.js' // 指定输出文件名
  },
  // devServer:{
  //     open:true,
  //     port:3000,
  //     contentBase:'src',
  //     hot:true,
  // },
  plugins:[ // 配置插件的节点
    // new webpack.HotModuleReplacementPlugin(), // 创建一个热更新的模块对象，启用热更新
    new htmlWebpack({
      template:path.join(__dirname, './src/index.html'),
      filename: 'index.html'
    }),
      new VueLoaderPlugin()
  ],
  module:{ // 这个节点用于配置所有第三方模块加载器
    rules:[ // 第三方模块匹配规则
      // 插件是从后往前调用，即： css-loader => style-loader
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
      {test: /\.(jpg|png|bmp|jpeg)$/, use:'url-loader?limit=1936470&name=[hash:8]-[name].[ext]'}, // 处理图片路径
       // limit 给定的值，是图片的大小。单位是byte，如果我们引用的图片，大于或等于给定的
      // limit值,则不会波转为base64格式的字符串， 如果图片小于给定的limit值,则会被转为
      // base64的字符串
      {test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader'},
        // 排除不需要处理的 js 文件
      {test:/\.m?js$/, use: 'babel-loader', exclude: /node_modules/},
      {test:/\.vue$/, use:'vue-loader'}
    ]
  },
  resolve: {
    alias: {
      // 'vue$':"vue/dist/vue.js"
    },
  },
};
// webpack-dev-server 生成的 bundle.js 在内存中，我们看不到
// html-webpack-plugin 会自动导入 js 文件