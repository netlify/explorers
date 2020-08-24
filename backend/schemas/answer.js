export default {
  name: 'answer',
  title: 'Answer',
  type: 'object',
  fields: [
    {
      name: 'answers',
      title: 'Answers',
      type: 'string',
    },
    {
      name: 'correct',
      title: 'Is this correct?',
      type: 'boolean',
    },
  ],
  // TODO: This isn't supported for objects
  // initialValue: {
  //   correct: false,
  // },
};
