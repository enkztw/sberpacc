const path = require(`path`);
const output = path.resolve(__dirname, 'target');

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
    }
}