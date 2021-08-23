const cx = require('nanoclass')
const blocksToHtml = require('@sanity/block-content-to-html')
const htmlmin = require('html-minifier')
const getSerializers = require('./lib/serializers')

module.exports = (config) => {
  config.setUseGitIgnore(false)

  config.addShortcode('classList', (...all) => cx(all))

  config.addShortcode(
    'debug',
    (value) =>
      `<pre style="padding: 100px 0; font-size: 14px; font-family: monospace;">${JSON.stringify(
        value,
        null,
        2,
      )}</pre>`,
  )

  config.addFilter('blocksToHtml', (blocks, type, theme) => {
    try {
      return blocksToHtml({
        blocks,
        serializers: getSerializers(theme)[type],
      })
    } catch (e) {
      console.log('Error converting blocks to HTML in blocksToHtml filter:', e)
      return ''
    }
  })

  config.addWatchTarget('./tailwind.config.js')
  config.addWatchTarget('./lib')
  config.addWatchTarget('./styles')
  config.addWatchTarget('./scripts')

  config.addPassthroughCopy({ './public': '/' })

  config.addTransform('htmlmin', (content, outputPath) => {
    if (outputPath && outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })

      return minified
    }

    return content
  })

  return {
    dir: {
      input: 'templates',
      data: '../data',
      includes: 'includes',
      layouts: 'layouts',
      output: 'build',
    },
  }
}
