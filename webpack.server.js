const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

const _mode = process.env.NODE_ENV || "development";
const isProd = _mode === "production";

const output = {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build'
};

const _module = {
    rules: [
        {
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [
                { loader: "babel-loader" },
                { loader: "ts-loader" },
            ],
        },
        {
            test: /\.js(x?)$/,
            exclude: /node_modules/,
            use: [
                { loader: "babel-loader" }
            ],
        }
    ]
};

module.exports = {
    target: 'node',
    entry: ["./src/server/server.tsx"],
    mode: _mode,
    module: _module,
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output,
    externals: [
        {
            'Config': JSON.stringify(isProd ? require('./conf/clientConfig.prod.json') : require('./conf/clientConfig.dev.json'))
        },
        webpackNodeExternals(),
    ]
}
