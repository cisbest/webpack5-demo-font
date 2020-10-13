const webpack = require("webpack");
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin"); // 生成.html文件的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 把样式提取为单独的css文件 的插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清除构建目录的插件
module.exports = {
    entry: "./src/main.js", // 打包入口文件
    mode: "development", // 使用开发模式
    devServer: {
        // 本地服务器代理
        contentBase: path.join(__dirname, "dist"), //指定在哪个目录下找要加载的文件
        compress: true,
        port: 8080, // 配置端口
        hot: true, // 配置热更新
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            ignoreOrder: false,
        }),
        new htmlWebpackPlugin({
            favicon: "./public/favicon.ico",
            filename: "index.html",
            template: "./public/index.html",
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"], // 处理css的loader
            },
            {
                //解析字体
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: "file-loader", // url-loader 也可以用来解析字体
            },
        ],
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "app.[hash:16].js",
        publicPath: "/", // 也可以用来处理路径问题，加在所有文件路径前的根路径
    },
};
