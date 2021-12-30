const blocksToHtml = require('@sanity/block-content-to-html')
const htmlmin = require('html-minifier')
const getSerializers = require('./lib/serializers')

module.exports = c => {
  c.setUseGitIgnore(false)

  c.addShortcode('classList', (...all) => all.filter(c => !!c).join(' '))

  c.addShortcode(
    'debug',
    value =>
      `<pre style="padding: 100px 0; font-size: 14px; font-family: monospace;">${JSON.stringify(
        value,
        null,
        2,
      )}</pre>`,
  )

  c.addFilter('blocksToHtml', (blocks, type, theme) => {
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

  c.addWatchTarget('./assets')
  c.addWatchTarget('./lib')
  c.addWatchTarget('./scripts')
  c.addWatchTarget('./styles')
  c.addWatchTarget('./tailwind.config.js')

  c.addPassthroughCopy({ './assets': '/assets' })
  c.addPassthroughCopy({ './scripts': '/scripts' })
  c.addPassthroughCopy({ './styles': '/styles' })

  c.addTransform('htmlmin', (content, outputPath) => {
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
    },
  }
}
