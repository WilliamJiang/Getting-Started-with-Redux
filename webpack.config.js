var path = require('path');
var webpack = require('webpack');

const SOURCE_DIR = 'src';

const getSrcEntry = (src_path => {
  var appPath = path.join(__dirname, src_path);
  const entries = {
    '1': 'step-1.js',
    '2': 'step-2.js',
    '8': 'step-8.js',
    '9': 'step-9.js',
    '10': 'step-10.js',
    'todo': 'todoApp.js',
    'main': 'main.js',
    'reddit': './reddit/index.js',
  }

  return (entry) => appPath + '/' + entries[entry]
})(SOURCE_DIR);

module.exports = {
  devtool: 'inline-source-map',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  entry: [
    'webpack-hot-middleware/client',
    getSrcEntry('main') //reddit
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      },
      {
        test: /\.gif$/,
        loader: "url-loader?mimetype=image/png"
      },
      {
        test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
        loader: "url-loader?mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
        loader: "file-loader?name=[name].[ext]"
      },
    ]
  }
}
