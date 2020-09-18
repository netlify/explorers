export default {
  name: 'explorer',
  title: 'Explorer',
  type: 'document',
  fields: [
    {
      name: 'avatar',
      title: 'Explorer Avatar',
      type: 'string',
    },
    {
      name: 'achievements',
      title: 'Achievements',
      type: 'array',
      of: [
        {
          name: 'certification',
          type: 'reference',
          to: { type: 'certification' },
        },
        { name: 'mission', type: 'reference', to: { type: 'mission' } },
        { name: 'stage', type: 'reference', to: { type: 'stage' } },
      ],
    },
  ],
};
