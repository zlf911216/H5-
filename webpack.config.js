'use strict';

var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const debug = process.env.NODE_ENV !== 'production';

var entries = getEntry('src/js/page/**/*.js', 'src/js/page/');
var chunks = Object.keys(entries);
var config = {
    entry: entries,
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'js/[name].js',
    },
    module: {
        loaders: [ //加载器
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css')
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass')
            }, {
                test: /\.html$/,
                loader: "html?-minimize"
            }, {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            }, {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'url-loader?limit=100&name=img/[name].[ext]'
            }, {
                test: /\.jsx?$/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
        ]
    },
    babel: {
        presets: ['es2015']
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'n-zepto'
        }),
        new CommonsChunkPlugin({
            name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
            chunks: chunks,
            minChunks: chunks.length // 提取所有entry共同依赖的模块
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('css/[name].css'),
        debug ? function() {} : new UglifyJsPlugin({ //压缩代码
                compress: {
                    warnings: false
                },
                except: ['$super', '$', 'exports', 'require'] //排除关键字
            }),
    ]
};
var pages = Object.keys(getEntry('src/view/**/*.html', 'src/view/'));

pages.forEach(function(pathname) {
    var conf = {
        filename: './' + pathname + '.html', //生成的html存放路径，相对于path
        template: './src/view/' + pathname + '.html', //html模板路径
        inject: false, //js插入的位置，true/'head'/'body'/false      
        minify: { //压缩HTML文件
            removeComments: false, //移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        }
    };
    if (pathname in config.entry) {
        conf.inject = 'body';
        conf.chunks = ['vendors', pathname];
        conf.hash = false;
    }
    config.plugins.push(new HtmlWebpackPlugin(conf));
});


module.exports = config;

function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;
    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = basename;
        entries[pathname] = ['./' + entry];
    }
    return entries;
}