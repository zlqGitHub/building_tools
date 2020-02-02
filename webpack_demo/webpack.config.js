// 命名为 webpack.config.js 的原因跟webpack-cli依赖有关 ，并遵循node语法
// defaultDescription: "webpack.config.js or webpackfile.js",

let path = require('path');   // node中的path核心模块解决了文件、目录路径相关问题


  
module.exports = {
    devServer: {  //开发服务器配置
        port: 3000,
        progress: true,
        contentBase: './build',   // 从 ./build 目录下的资源  
        compress: true    //gzip压缩
    },
    mode: 'development',   //mode：模式，默认两种production development
    entry: './src/index.js',    //入口(找到入口会将所有相关依赖模块进行打包处理)
    output: {
        filename: 'bundle.js',   //打包后的文件名
        path: path.resolve(__dirname, 'build')   //输出路径，必须是一个绝对路径
    },


}