const client = require('@sanity/client')

module.exports = client({
  projectId: '<PROJECT_ID>',
  dataset: 'production',
  apiVersion: 'v2021-06-07',
  useCdn: false,
})
