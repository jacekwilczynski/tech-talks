const { VueLoaderPlugin } = require("vue-loader");
const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',

    entry: path.resolve('src/grid/index.ts'),
    output: {
        path: path.resolve('public'),
        publicPath: '/',
        filename: 'grid.js',
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [['babel-preset-typescript-vue', { onlyRemoveTypeImports: true }]],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose": true }],
                        ],
                        babelrc: false,
                    },
                }]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },

    plugins: [
        new VueLoaderPlugin(),
    ],

    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        },
        extensions: ['.js', '.ts', '.vue'],
    }
};
