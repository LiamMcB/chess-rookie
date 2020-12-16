const path = require('path');

module.exports = {
  // Determines whether application is running in production or build mode
  mode: process.env.NODE_ENV,
  // Application entry point
  entry: './client/index.tsx',
  // Where the bundle is being compiled
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  // Rules for file loaders
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ]
  },
  // Rules for the dev server
  devServer: {
    publicPath: '/dist/',
    hot: true,
    contentBase: path.join(__dirname, './client'),
    // Routes page to index.html in WDS if there is any error with path
    historyApiFallback: true,
  },
  // Allows for these extensions to be omitted on imports
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  }
}