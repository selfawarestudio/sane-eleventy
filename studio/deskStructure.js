import S from '@sanity/desk-tool/structure-builder'
// import React from 'react'
// import Emoji from 'react-emoji-render'

export default () =>
  S.list()
    .title('content!')
    .items([
      // S.listItem()
      //   .title('Landing Page')
      //   .icon(() => <Emoji style={{ fontSize: 30 }} text="💕" />)
      //   .child(
      //     S.editor()
      //       .title('Landing Page')
      //       .schemaType('landing')
      //       .documentId('landing'),
      //   ),
      // S.listItem()
      //   .title('Configuration')
      //   .icon(() => <Emoji style={{ fontSize: 30 }} text="🌎" />)
      //   .child(
      //     S.editor()
      //       .title('Config')
      //       .schemaType('config')
      //       .documentId('config'),
      //   ),
    ])
