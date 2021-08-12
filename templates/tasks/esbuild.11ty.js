const path = require('path')
const esbuild = require('esbuild')

module.exports = class {
  async data() {
    return {
      permalink: false,
    }
  }

  async render() {
    await esbuild.build({
      entryPoints: [path.join(__dirname, '..', '..', 'scripts', 'index.js')],
      minify: true,
      bundle: true,
      sourcemap: true,
      outfile: path.join(__dirname, '..', '..', 'build', 'app.js'),
    })
  }
}
