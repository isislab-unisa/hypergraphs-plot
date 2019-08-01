var path = require('path');

module.exports = {
    entry: "./src/main.js",
    output: {
      path: path.resolve(__dirname,'dist'), //locazione
      filename: "bundle.js",  //nome del file
      publicPath: '/dist/', //indichiamo al webpack server dove trovare i file da creare
      libraryTarget: 'var',
      library: 'hgplot'   //nome libreria
    },
    performance: { hints: false },
  

  
  module: {
      rules: [{
        test:/\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }],
  }
}
