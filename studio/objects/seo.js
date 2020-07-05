export default {
  title: 'SEO Metadata',
  name: 'seo',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string',
    },
    {
      title: 'URL',
      name: 'url',
      type: 'url',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'asset',
    },
    {
      title: 'Keywords',
      name: 'keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
  ],
}
