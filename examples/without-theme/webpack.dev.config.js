const webpack = require(`webpack`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);

module.exports = {
  mode: `development`,
  entry: [`react-hot-loader/patch`, `./src/js/index.js`],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [`babel-loader`],
      },
      {
        test: /\.css$/,
        use: [{ loader: `style-loader` }, { loader: `css-loader` }],
      },
    ],
  },
  resolve: {
    extensions: [`*`, `.js`, `.jsx`],
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: `/`,
    filename: `bundle.js`,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Adds HMR
    new webpack.NamedModulesPlugin(), // Display module path in HMR updates
    new HtmlWebpackPlugin({
      title: `CSSAPI: WithoutTheme`,
      template: `index.html`,
    }), // HTML template generation
  ],
  devServer: {
    contentBase: `./dev`, // Serve from dir
    hot: true, // Enable HMR
  },
};
