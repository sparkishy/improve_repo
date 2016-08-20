// webpack.config.js
module.exports = {
  entry: './ity.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.sass$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
		 test: /\.svg$/,
		 loader: 'babel!react-svg'
	  },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};