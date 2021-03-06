module.exports = {
    entry: './src/projector.ts',
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
        ]
    },
    output: {
        path: __dirname,
        filename: './index.js',
        libraryTarget: 'umd'
    }
};