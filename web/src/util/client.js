const client = require('@sanity/client')

module.exports = client({
  // TODO: set sanity projectId
  projectId: '0v76nywm',
  dataset: 'production',
  useCdn: true,
})
