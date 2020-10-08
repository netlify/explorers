export default {
  name: 'stage',
  title: 'Stage',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'checkpoint',
      title: 'Checkpoint',
      type: 'reference',
      to: { type: 'checkpoint' },
    },
  ],
};
