module.exports = {
    entry: "./src/main.js",
    output: {
      filename: "bundle.js",
      libraryTarget: 'var',
      library: 'hgplot'
    }
  }