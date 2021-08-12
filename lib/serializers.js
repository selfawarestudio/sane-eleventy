const blocksToHtml = require('@sanity/block-content-to-html')
const h = blocksToHtml.h

module.exports = {
  default: {
    types: {
      block: (props) => {
        const { style = 'normal' } = props.node

        if (style === 'h3') {
          return h(
            'h3',
            {
              className: 'text-50 font-bold mb-20',
            },
            props.children,
          )
        }

        if (style === 'normal') {
          return h(
            'p',
            {
              className: 'text-18 m:text-22 leading-130 mb-30 m:mb-40',
            },
            props.children,
          )
        }

        return blocksToHtml.defaultSerializers.types.block(props)
      },
      button: ({ node }) => {
        return h(
          'a',
          {
            className:
              'inline-block text-18 m:text-22 rounded-full py-15 px-30 border-2 border-black bg-black text-white hover:bg-white hover:text-black transition duration-300 ease-out-quint',
            href: node.url,
          },
          node.title,
        )
      },
    },
    marks: {
      link: ({ children, mark }) =>
        h(
          'a',
          {
            className: 'underline hover:no-underline',
            href: mark.url,
          },
          children,
        ),
    },
  },
}
