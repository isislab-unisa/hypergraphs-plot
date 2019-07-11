module.exports = {
    entry: "./src/try.js",
    output: {
      filename: "bundle.js",
      libraryTarget: 'var',
      library: 'trylib'
    }
  }