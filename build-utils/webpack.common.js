const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// webpack.config.js
const Dotenv = require('dotenv-webpack');

const publicPath = '/';
module.exports = {
    // Entry point, from where all extraction should be made
    entry: './src/index.js',
    // Init webpack rules to collect js, jsx, css files
    module: {
        rules: [
            {
                // Extract and Transpile ES6+ in to ES5 
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                // Extract CSS files
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
        ]
    },
    // https://webpack.js.org/configuration/output/
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'widget.js',
        chunkFilename: 'widget.chunk.js',
        // Output library name
        library: 'ReactChatBot',
        libraryTarget: 'umd',
        publicPath: publicPath,
        libraryExport: 'default',
    },
    // https://webpack.js.org/configuration/dev-server/
    devServer: {
        static: {
            directory: path.join(__dirname, '../dist'),
        },
        hot: true,
        liveReload: true,
        compress: true,
        port: 9000
    },
    devtool: "inline-source-map",
    // https://webpack.js.org/configuration/plugins/
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: `index.html`,
            template: path.join(__dirname, '../public/index.html'),
            inject: 'body',
            scriptLoading: 'blocking'
        }),
        new MiniCssExtractPlugin({
            filename: "widget.css",
            chunkFilename: "widget.css"
        }),
    ],
    // https://webpack.js.org/configuration/optimization/
    optimization: {
        minimizer: [
            (compiler) => {
                const TerserPlugin = require('terser-webpack-plugin');
                new TerserPlugin({
                    terserOptions: {
                        output: {
                            comments: false,
                        }
                    },
                }).apply(compiler);
            },
        ]
    }
}