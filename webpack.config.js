const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const jsOutputDir = './Content/dist';
const UglifyJs = require('uglifyjs-webpack-plugin');
//const momentLocales = /en-gb|pl/;

module.exports = (env) => {
    const isAnalyze = env && env.analyze;
    const isDevBuild = !(env && env.prod) && !isAnalyze;

    const extractSass = new ExtractTextPlugin({
        filename: "[name].css"
    });

    return [{
        stats: {
            modules: false
        },
        entry: {
            'site': './Scripts/src/LoginForm.tsxrm.tsx'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        output: {
            path: path.join(__dirname, jsOutputDir),
            filename: '[name].js',
            publicPath: '/Content/'
        },
        performance: {
            maxEntrypointSize: 51200000,
            maxAssetSize: 512000
        },
        module: {
            rules: [{
                test: /\.ts$/,
                include: /Scripts/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            },
                {
                    test: /\.tsx?$/,
                    include: /Scripts/,
                    use: 'awesome-typescript-loader?silent=true'
                },
                {
                    test: /\.scss$/,
                    use: extractSass.extract({
                        use: [{
                            loader: "css-loader"
                        }, {
                            loader: "sass-loader"
                        }],
                        fallback: "style-loader"
                    })
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                },
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/,
                    use: 'url-loader?limit=100000'
                },
                // {
                //     test: /\.(jpg|png|gif|svg|pdf|ico)$/,
                //     use: [
                //         {
                //             loader: 'file-loader',
                //             options: {
                //                 name: '[path][firstName]-[hash:8].[ext]'
                //             },
                //         },
                //     ]
                // },
            ]
        },
        plugins: [
            new CheckerPlugin(),
            //new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, momentLocales),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function (module) {
                    return module.context && module.context.indexOf('node_modules') !== -1;
                }
            }),
            extractSass,
            addTimeStamp
        ].concat(isDevBuild ? [
            new webpack.SourceMapDevToolPlugin({
                //filename: '[file].map',
                moduleFilenameTemplate: path.relative(jsOutputDir, '[resourcePath]')
            }),
            new webpack.NamedModulesPlugin(),
        ] : [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            // new webpack.optimize.UglifyJsPlugin(),
            new UglifyJs(),
            new webpack.optimize.AggressiveMergingPlugin()
        ])
            .concat(isAnalyze ? [new BundleAnalyzerPlugin()] : [])
    }];
};

const addTimeStamp = function () {
    this.plugin('watch-run', function (watching, callback) {
        var date = new Date();
        var pad = (a, b) => (1e15 + a + "").slice(-b);
        var Y = date.getFullYear();
        var M = pad((date.getMonth() + 1), 2);
        var D = pad(date.getDate(), 2);
        var h = pad(date.getHours(), 2);
        var m = pad(date.getMinutes(), 2);
        var s = pad(date.getSeconds(), 2);
        console.log(' ');
        console.log('\x1b[33m%s\x1b[0m', '[' + Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s + ']');
        callback();
    })
};