export default {
  title: 'Image',
  name: 'asset',
  type: 'object',
  fields: [
    {
      title: 'Image',
      name: 'image',
      type: 'image',
    },
    {
      title: 'Alt Text',
      name: 'alt',
      type: 'string',
      description:
        'A short description of the image that is important for accessibility and SEO',
      validation: (Rule) => Rule.required(),
    },
  ],
}
