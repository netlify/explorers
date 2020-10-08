export default {
  name: 'instructor',
  title: 'Instructor',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Instructor Name',
      type: 'string',
    },
    {
      name: 'avatar',
      title: 'Instructor Avatar',
      type: 'image',
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
      of: [{ type: 'string' }],
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
