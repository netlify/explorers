export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'netlifyId',
      title: 'Netlify User ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'missions',
      title: 'Missions Started By This User',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'mission' }],
        },
      ],
    },
    {
      name: 'progress',
      title: 'Progress on Individual Videos',
      type: 'array',
      of: [{ type: 'videoProgress' }],
    },
  ],
};
