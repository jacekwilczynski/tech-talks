const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',

    entry: path.resolve('src/front/index.ts'),
    output: {
        path: path.resolve('public'),
        publicPath: '/',
        filename: 'front.js',
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-typescript', { onlyRemoveTypeImports: true }]],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose": true }],
                        ],
                        babelrc: false,
                    },
                }]
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.ts'],
    }
};
