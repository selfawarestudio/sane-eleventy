const blocksToHtml = require(`@sanity/block-content-to-html`)

module.exports = function allBlocksToHtml(data) {
  if (typeof data === 'object') {
    if (data._type && data._type === 'richText') {
      return blocksToHtml(data)
    } else {
      const entries = Object.entries(data)
      for (let i = 0; i < entries.length; i++) {
        const [key, val] = entries[i]
        data[key] = allBlocksToHtml(val)
      }
      return data
    }
  } else if (typeof data === 'array') {
    return data.map(allBlocksToHtml)
  } else {
    return data
  }
}
