export default {
  name: 'certification',
  title: 'Certification',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
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
      name: 'missions',
      title: 'Missions',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'mission' },
        },
      ],
    },
  ],
};
