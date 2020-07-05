import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import config from './documents/config'
import seo from './objects/seo'
import asset from './objects/asset'

const documents = [config]
const objects = [seo, asset]

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([...documents, ...objects]),
})
