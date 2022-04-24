module.exports = {
    components: 'src/component/**/*.js',
    webpackConfig: Object.assign({}, require('./config/webpack.config.js'), {
        /* Custom config options */
        module: {
            rules: [
                // Babel loader will use your project’s babel.config.js
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                // Other loaders that are needed for your components
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
        }
    })
};
