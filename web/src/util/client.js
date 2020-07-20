const client = require('@sanity/client')

module.exports = client({
  projectId: '<MY_PROJECT_ID>',
  dataset: 'production',
  useCdn: false,
})
