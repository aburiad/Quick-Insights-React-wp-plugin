const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,  // Rule for processing JS and JSX files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,  // Rule for processing image files
        type: 'asset/resource',  // Webpack 5 way to handle static assets
      },
      {
        test: /\.css$/,  // Rule for processing CSS files
        use: ['style-loader', 'css-loader'],  // Use css-loader and style-loader
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
