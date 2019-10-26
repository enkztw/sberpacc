const path = require(`path`);
const output = path.resolve(__dirname, 'target');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: require.resolve('./src/index.js')
    },
    output: {
        path: output,
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules[\\/].*/,
                use: require.resolve('babel-loader')
            }
        ]
    },
    plugins: [
        new CopyPlugin([
            {
                from: 'src/static',
                to: '.'
            }
        ])
    ]
}