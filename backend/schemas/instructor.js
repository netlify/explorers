export default {
  name: 'instructor',
  title: 'Instructor',
  type: 'document',
  fields: [
    {
      name: 'avatar',
      title: 'Instructor Avatar',
      type: 'string',
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
    },
    {
      name: 'social',
      title: 'Social',
      type: 'array',
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
