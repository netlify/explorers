export default {
  name: 'checkpoint',
  title: 'Checkpoint',
  type: 'document',
  fields: [
    {
      name: 'minimumScore',
      title: 'Miniumum Score',
      type: 'number',
    },
    {
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'question' },
        },
      ],
    },
  ],
};
