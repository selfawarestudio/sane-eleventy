const client = require('@sanity/client')

module.exports = client({
  projectId: '<PROJECT_ID_HERE>',
  dataset: 'production',
  useCdn: true,
})
