// webpack 是node写的
let path = require('path');
let HtmlWebPackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
let UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
let webpack = require('webpack');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let copyWebpackPlugin = require('copy-webpack-plugin');
console.log(path.resolve(__dirname, 'dist'));
// node 和 核心模块、路径模块
module.exports = {
    optimization: {
        minimizer: [
            // new UglifyjsWebpackPlugin({}),
            new OptimizeCssAssetsWebpackPlugin({})
        ]
    },
    mode: 'production',
    entry: './src/index.js',
    // entry: {
    //     home: './src/index.js',
    //     b: './src/b.js'
    // },
    devServer: {
        port: '3030',
        contentBase: './dist',
        progress: true,
        compress: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: { '/api': '' },
                changeOrigin: true,
                secure: false,
            }
        }
        //     before(app) {
        //         app.get('/user', function (req, res) {
        //             res.json({ name: "hehe" })
        //         })
        //     }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: 'bundle.js',
        filename: 'bundle[hash].js',
        // filename: '[name].js',
        // publicPath: 'http://www.baidu.cn'
    },
    externals: {
        jquery: "jQuery"
    },

    devtool: 'source-map',
    resolve: {
        modules: [path.resolve('node_modules')],
        extensions: ['.js', '.css', '.json', '.vue'],
        alias: {
            bootstrap: "bootstrap/dist/css/bootstrap.css",
            // '@':path.resolve(__dirname,'src')
        },
        mainFields: ['style', 'main']
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            // chunks: ['home', 'b'],
            hash: true,
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebPackPlugin({
            template: './src/b.html',
            filename: 'b.html',
            chunks: ['b']
        }),
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new CleanWebpackPlugin('./dist'),
        new copyWebpackPlugin([
            { from: 'img', to: './img1' }
        ]),
        new webpack.BannerPlugin('Made In China'),
        new webpack.IgnorePlugin(/\.\/locale/,/moment/)
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        outputPath: '/img/',
                        // publicPath: 'http://www.baidu.cn'
                    }
                }
            },
            {
                test: require.resolve('jquery'),
                use: 'expose-loader?$'
            },
            {
                test: '/\.js$/',
                loader: 'eslint-loader',
                options: {
                    enforce: 'pre'
                }
            },
            {
                test: /\.js$/,
                // use: {
                //     loader: 'babel-loader',
                //     options: {
                //         plugins: [
                //             ["@babel/plugin-proposal-decorators", { "legacy": true }],
                //             ["@babel/plugin-proposal-class-properties", { "loose": true }],
                //             "@babel/plugin-transform-runtime",
                //             // '@babel/runtime'
                //         ]
                //     }
                // }
                use: "babel-loader",
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                test: /.css$/,
                use: [
                    // {
                    //     loader:'style-loader',
                    //     options:{insertAt:'top'}
                    // },
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader']
            }
        ]
    }
}