// 命名为 webpack.config.js 的原因跟webpack-cli依赖有关 ，并遵循node语法
// defaultDescription: "webpack.config.js or webpackfile.js",

let path = require('path');   // node中的path核心模块解决了文件、目录路径相关问题

// 插件
let HtmlWebpackPlugin = require('html-webpack-plugin');  // HTML相关
let MiniCssExtractPlugin = require('mini-css-extract-plugin');  // 抽离css为独立文件
let OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');  //优化css
const TerserJSPlugin = require('terser-webpack-plugin');   // 优化js
  
module.exports = {
    optimization: {   // 优化项
        // minimizer: [
        //     new OptimizeCSSAssetsPlugin({}),
        //     new TerserJSPlugin({}),
        // ],
    },
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
        // filename: 'bundle.[hash:8].js',    生成的js文件中添加hash值
        path: path.resolve(__dirname, 'build')   //输出路径，必须是一个绝对路径
    },

    plugins:[   // 数组，配置着所有的webpack插件相关内容
        new HtmlWebpackPlugin({   
            template: './src/index.html',  //参考模板
            filename: 'index.html',    //打包后的文件名称
            // minify: {
            //     removeAttributeQuotes: true,   //删除双引号
            //     collapseWhitespace: true,   //删除空白行
            // },
            hash: true   //在页面中src属性后添加hash值
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css',

        }),

    ],
    
    module: {   //模块
        // loader 的顺序默认是 从下到上，从右到左
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,   //将css代码抽离到main.css中
                    // style-loader 的作用是将css插入到head中
                    // {
                    //     loader: 'style-loader',
                    //     options: {
                    //         insert: 'top'
                    //     }
                    // }, 
                    'css-loader',
                    'postcss-loader',
                ]
            },
            {
                test: /\.less$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    // {
                    //     loader: 'style-loader',
                    // },
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    }

}