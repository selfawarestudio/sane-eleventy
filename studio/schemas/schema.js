import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
// import React from 'react'
// import Emoji from 'react-emoji-render'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([]),
})
