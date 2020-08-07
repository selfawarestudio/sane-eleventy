const fs = require('fs')
const path = require('path')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const cx = require('nanoclass')
// const blocksToHtml = require('@sanity/block-content-to-html')
// const client = require('./src/util/client')
// const imageUrlBuilder = require('@sanity/image-url')
// const builder = imageUrlBuilder(client)
// const linkResolver = require('./util/linkResolver')

module.exports = function(eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false)

  eleventyConfig.addNunjucksAsyncShortcode('webpackAsset', async (name) => {
    const manifestData = await readFile(
      path.resolve(__dirname, 'src/templates/includes/_manifest.json'),
    )
    const manifest = JSON.parse(manifestData)

    return manifest[name]
  })

  eleventyConfig.addShortcode(
    'debug',
    (value) =>
      `<pre style="padding: 100px 0; font-size: 14px; font-family: monospace;">${JSON.stringify(
        value,
        null,
        2,
      )}</pre>`,
  )

  eleventyConfig.addShortcode('classNames', (...all) => cx(all))

  // eleventyConfig.addFilter('href', linkResolver)

  // eleventyConfig.addFilter('blocksToHtml', (blocks) => {
  //   try {
  //     const h = blocksToHtml.h
  //     const serializers = {
  //       marks: {
  //         externalLink: ({ children, mark }) =>
  //           h(
  //             'a',
  //             {
  //               className: 'inline-link',
  //               href: mark.url,
  //               target: '_blank',
  //               rel: 'noopener noreferrer',
  //             },
  //             children,
  //           ),
  //         internalLink: ({ children, mark }) =>
  //           h(
  //             'a',
  //             {
  //               className: 'inline-link',
  //               href: linkResolver({
  //                 _type: 'internalLink',
  //                 reference: mark.reference,
  //               }),
  //             },
  //             children,
  //           ),
  //       },
  //     }
  //     return blocksToHtml({ blocks, serializers })
  //   } catch (e) {
  //     return ''
  //   }
  // })

  // eleventyConfig.addShortcode('urlFor', (image, width) => {
  //   return builder
  //     .image(image)
  //     .width(width)
  //     .auto('format')
  //     .url()
  // })

  eleventyConfig.addPassthroughCopy({ 'src/assets': '/assets' })

  return {
    dir: {
      input: 'src/templates',
      data: '../data',
      includes: 'includes',
      layouts: 'layouts',
      output: 'build',
    },
  }
}
