require('babel-polyfill');
const path = require('path');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const { APP_ENV } = process.env;
const mode = APP_ENV || 'development';
const isDev = () => mode !== 'production';

module.exports = {
    context: path.join(__dirname, 'src'),
    mode,
    entry: [
        'babel-polyfill',
        './index.js',
    ],
    devtool: isDev() ? 'cheap-eval-source-map' : 'none',
    output: {
        publicPath: '/',
        path: isDev() ? path.join(__dirname, 'public') : path.join(__dirname, 'dist'),
        filename: isDev() ? 'bundle.[chunkhash].js' : 'bundle.[chunkhash].js',
        chunkFilename: '[name].[chunkhash].chunk.js',
    },
    watchOptions: {
        poll: 1000
    },
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        port: 9000,
        historyApiFallback: true,
        disableHostCheck: true,
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    cache: true,
                    quiet: true,
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(isDev() ? ['public'] : ['dist']),
        new MiniCssExtractPlugin({
            filename: isDev() ? 'bundle.[chunkhash].css' : 'bundle.[chunkhash].css',
        }),
        new OptimizeCSSAssetsPlugin({}),
        new HtmlWebpackPlugin({
            title: 'Rick and Marty',
            hash: true,
            fileName: 'index.html',
            template: './index.html',
            templateParameters: {
                title: 'Ricky Marty',
            }
        }),
    ]
};
