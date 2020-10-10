export default {
  name: 'mission',
  title: 'Mission',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Mission Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(70),
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
      name: 'description',
      title: 'Description',
      type: 'markdown',
      options: {
        minRows: 15,
      },
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
    },
    {
      name: 'instructor',
      title: 'Instructor',
      type: 'reference',
      to: [
        {
          type: 'instructor',
        },
      ],
    },
    {
      name: 'stages',
      title: 'Stages',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'stage' },
        },
      ],
    },
  ],
};
