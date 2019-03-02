var config = {
   entry: './app.js',
	
   output: {
      path:__dirname,
      filename: 'dist/fuck.bundle.js',
   },
	
   devServer: {
      inline: true,
      port: 8080
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',				
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}

module.exports = config;
