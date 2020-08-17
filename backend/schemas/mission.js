export default {
  name: 'mission',
  title: 'Mission',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Mission Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
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
