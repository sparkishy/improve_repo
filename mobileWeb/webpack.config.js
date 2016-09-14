// webpack.config.js

module.exports = {
  entry: './indi.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        }
    },
  module: {
    loaders: [
      {
        test: /\.sass$/,
        loader: 'style!css!sass'
      },
      { test: /vendor\/.+\.(jsx|js)$/,
		loader: 'imports?jQuery=jquery,$=jquery,this=>window'
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