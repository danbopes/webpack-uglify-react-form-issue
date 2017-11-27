var path = require('path');
var webpack = require('webpack');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = env => {
	return {
		devtool: 'source-map',
		entry: './src/index.jsx',
		output: {
			path: __dirname + '/public/',
			filename: 'bundle.js',
			publicPath: '/',
		},
		plugins: [
			new UglifyJsPlugin({
				uglifyOptions: {
					mangle: true,
				},
				sourceMap: true
			})
		],
		resolve: {
			extensions: ['.js', '.jsx'],
			modules: [
				path.resolve('./src'),
				path.resolve('./node_modules')
			]
		},
		module: {
			rules: [
				{
					test: /.jsx?$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					query: {
						presets: ['react', ['env', {
							targets: {
								browsers: [
									'ie >= 11',
									'chrome >= 49'
								] 
							},
							shippedProposals: true,
							useBuiltIns: 'entry'
						}]],
						plugins: ['transform-object-rest-spread']
					}
				}
			]
		}
	};
};
