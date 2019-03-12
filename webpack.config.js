var webpack = require('webpack');
var path = require('path');
var fs = require("fs");
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var InterpolateHtmlPlugin = require('interpolate-html-plugin');
var MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var GitRevisionPlugin = require("git-revision-webpack-plugin");
var ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
var createStyledComponentsTransformer = require("typescript-plugin-styled-components").default;

function getConfig(isProduction) {
    var isDebug = !isProduction;

    var sourceRoot = path.join(__dirname, "src");
    var appRoot = path.join(__dirname, "src/app");
    var nodeModulesPath = path.join(__dirname, "node_modules");
    var sourcePublicRoot = path.join(__dirname, "src/public");
    var ethstatsUiPublicRoot = path.join(nodeModulesPath, "ethstats-ui/public");
    var assetsRoot = path.join(__dirname, "src/assets");
    var outputRoot = path.join(__dirname, "dist");

    var localesInfo = JSON.parse(fs.readFileSync(path.join(appRoot, "translation", "locales.json"), "utf8"));
    var defaultLocale = localesInfo.find(l => !!l.default).locale;
    var availableLocales = localesInfo.map(l => l.locale);

    var translation = require(path.join(appRoot, "translation", defaultLocale + ".json"));

    var gitRevisionPlugin = new GitRevisionPlugin({
        branch: true
    });

    var tsConfigJsonFilename = "tsconfig.webpack.json";
    var styledComponentsTransformer = createStyledComponentsTransformer();

    var plugins = [
        new ForkTsCheckerWebpackPlugin({
            tsconfig: path.resolve(".", tsConfigJsonFilename),
            tslint: path.resolve(".", isProduction ? "tslint.prod.json" : "tslint.json"),
            async: false
        }),
        // Only include needed monaco-editor languages/features in bundle
        // TODO: make separate build for monaco-editor in library mode
        new MonacoWebpackPlugin({
            // See https://github.com/Microsoft/monaco-editor-webpack-plugin for available options
            output: "js/vs",
            languages: ["solidity", "json"],
            features: ["contextmenu", "clipboard", "find", "folding"]
        }),
        // These are preprocessor constants which are replaced inline (that's why the extra quotes)
        new webpack.DefinePlugin({
            // This is needed to be able to activate some features for development (like ReduxDevTools)
            // and, also, some libs (like React) have an optimized (smaller&faster) builds
            // if NODE_ENV is set to "production"
            'process.env.NODE_ENV': JSON.stringify(isDebug ? 'development' : 'production'),

            // Git version info is needed by Sentry
            'GIT_VERSION': JSON.stringify(gitRevisionPlugin.version()),
            'GIT_COMMITHASH': JSON.stringify(gitRevisionPlugin.commithash()),
            'GIT_BRANCH': JSON.stringify(gitRevisionPlugin.branch()),

            'APP_AVAILABLE_LOCALES': JSON.stringify(availableLocales.join(",")),
            'APP_DEFAULT_LOCALE': JSON.stringify(defaultLocale)
        }),
        new CopyWebpackPlugin([
            {
                from: sourcePublicRoot,
                to: outputRoot,
                ignore: ["index.html"]
            },
            {
                from: path.join(ethstatsUiPublicRoot, "fonts"),
                to: path.join(outputRoot, "fonts"),
            },
            {
                from: path.join(ethstatsUiPublicRoot, "css/fonts.css"),
                to: path.join(outputRoot, "css/fonts.css"),
            },
            {
                from: path.join(ethstatsUiPublicRoot, "css/normalize.css"),
                to: path.join(outputRoot, "css/normalize.css"),
            }
        ]),
        new HtmlWebpackPlugin({
            inject: "body",
            hash: true,
            title: translation["title"],
            description: translation["description"],
            template: path.join(sourcePublicRoot, "index.html")
        }),
        new InterpolateHtmlPlugin({
            'APP_DEFAULT_LOCALE': defaultLocale
        }),
        new FaviconsWebpackPlugin({
            logo: path.join(assetsRoot, "block-explorer-logo.svg"),
            title: translation["title"]
        })
    ];

    if (!isDebug) {
        plugins.push(new webpack.HashedModuleIdsPlugin());
    }

    return {
        mode: isDebug ? "development" : "production",
        context: appRoot,
        entry: {
            // Entry points (bundles)
            // The key is a bundle name, the value is the entry file
            // If you are using async require, you also need to add
            // __webpack_public_path__ to the top of the entry file
            "js/app": './index'
        },
        output: {
            path: outputRoot,
            jsonpFunction: '__webpackJsonp',
            hotUpdateFunction: '__webpackHotUpdate',
            sourcePrefix: '',
            crossOriginLoading: "anonymous",
            filename: "[name].bundle.js",
            chunkFilename: "js/[contentHash].bundle.js",
            pathinfo: !!isDebug,
            publicPath: "/"
        },
        optimization: isDebug ? void 0 : {
            minimizer: [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        // Don't merge statements with comma. This makes breakpoints unusable in debugger.
                        compress: {
                            sequences: false,
                            join_vars: false,
                            // Dropping unused variables causes problems with libraries such as MobX
                            unused: false,
                            warnings: false,
                            // FIX https://github.com/mishoo/UglifyJS2/issues/1317
                            if_return: false,
                            // FIX https://github.com/mishoo/UglifyJS2/issues/2498
                            properties: false
                        },
                        mangle: {
                            safari10: true
                        }
                    },
                    sourceMap: true
                })
            ]
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /monaco-editor/,
                    enforce: "pre",
                    loader: "source-map-loader"
                },
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader?configFile=' + tsConfigJsonFilename,
                    options: {
                        transpileOnly: true,
                        getCustomTransformers: () => ({ before: [styledComponentsTransformer] })
                    }
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        outputPath: "img/"
                    }
                },
                // Needed for monaco-editor
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
        },
        resolve: {
            alias: {
                web3$: path.resolve(__dirname, "src/vendor/web3/web3-1.0.0-beta.34.min.js"),
                "3box$": path.resolve(__dirname, "src/vendor/3box/3box-1.2.1.min.js")
            },
            modules: [
                sourceRoot,
                nodeModulesPath
            ],
            extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
        },
        // If incremental build performance becomes an issue, this option can be enabled
        // to generate faster source maps
        devtool: /*isDebug ? 'eval-source-map' : */'source-map',
        // Uncomment this to use polling instead of file watchers (e.g. too few available
        // from environment)
        watchOptions: {
            aggregateTimeout: 0
            //poll: true
        },
        plugins: plugins
    };

}

module.exports = getConfig;
