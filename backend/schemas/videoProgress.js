export default {
  name: 'videoProgress',
  title: 'Video Watch Progress',
  type: 'object',
  fields: [
    {
      name: 'video',
      title: 'Video',
      type: 'reference',
      to: [{ type: 'video' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'progress',
      title: 'Watch Progress Percentage',
      type: 'number',
      validation: (Rule) => Rule.required().min(0).max(100),
    },
  ],
};
