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
      name: 'blurb',
      title: 'Small Blurb about Mission that Shows in Card',
      type: 'string',
      validation: (Rule) => Rule.required().max(150),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'markdown',
      validation: (Rule) => Rule.required(),
      options: {
        minRows: 15,
      },
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'instructors',
      title: 'Instructor(s)',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: 'reference',
          to: { type: 'instructor' },
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
