import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import config from './documents/config'
import seo from './objects/seo'
import a11yImage from './objects/a11yImage'

const documents = [config]
const objects = [seo, a11yImage]

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([...documents, ...objects]),
})
