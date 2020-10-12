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
      name: 'checkpoint',
      title: 'Checkpoint',
      type: 'reference',
      to: { type: 'checkpoint' },
    },
  ],
};
