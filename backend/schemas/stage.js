export default {
  name: 'stage',
  title: 'Stage',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { name: 'checkpoint', type: 'reference', to: { type: 'checkpoint' } },
        { name: 'video', type: 'reference', to: { type: 'video' } },
      ],
    },
  ],
};
