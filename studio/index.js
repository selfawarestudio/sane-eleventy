import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import config from './types/config'

import seo from './types/seo'
import asset from './types/asset'

const documents = [config]
const objects = [seo, asset]

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([...documents, ...objects]),
})
