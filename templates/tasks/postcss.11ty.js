const path = require('path')
const fs = require('fs')
const postcss = require('postcss')
const loadConfig = require('postcss-load-config')

module.exports = class {
  async data() {
    const rawPath = path.join(__dirname, '..', '..', 'styles', 'index.css')

    return {
      permalink: 'app.css',
      rawPath,
      rawCss: fs.readFileSync(rawPath),
    }
  }

  async render({ rawCss, rawPath }) {
    return await loadConfig().then(({ plugins }) =>
      postcss(plugins)
        .process(rawCss, { from: rawPath })
        .then((result) => result.css),
    )
  }
}
