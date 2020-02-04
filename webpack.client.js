const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const styledComponentsTransformer = createStyledComponentsTransformer();

const _mode = process.env.NODE_ENV || "development";
const isProd = _mode === "production";

const output = {
    filename: '[name].client.js',
    chunkFilename: '[name].client.js',
    path: path.resolve(__dirname, 'build/public'),
    publicPath: '/build/public/'
};

const minimizer = [];
if (isProd) {
    minimizer.push(
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            extractComments: false,
            sourceMap: true,
            uglifyOptions: {
                warnings: false,
                parse: {},
                compress: {},
                ecma: 6,
                mangle: true,
                output: null,
                toplevel: false,
                nameCache: null,
                ie8: false,
                keep_fnames: false,
            }
        })
    );
}

const optimization = {
    minimizer,
    runtimeChunk: 'single'
};

const _module = {
    rules: [
        {
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: "babel-loader",
                    // options: babelLoaderOptions
                },
                {
                    loader: "ts-loader",
                    options: {
                        getCustomTransformers: () => ({ before: [styledComponentsTransformer] })
                    }
                }
            ],
        },
        {
            test: /\.js(x?)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: "babel-loader",
                    // options: babelLoaderOptions
                }
            ],
        }
    ]
};

const plugins = [
];

module.exports = {
    target: 'web',
    entry: ["./src/client/client.tsx"],
    mode: _mode,
    module: _module,
    output,
    plugins,
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    externals: {
        'Config': JSON.stringify(isProd ? require('./conf/clientConfig.prod.json') : require('./conf/clientConfig.dev.json'))
    },
    optimization,
    devtool: isProd ? 'none' : 'source-map'
}
