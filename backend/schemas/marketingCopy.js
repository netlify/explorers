export default {
  name: 'marketingCopy',
  title: 'Marketing Copy',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'markdown',
    },
    {
      name: 'pagePath',
      title: 'Page Path',
      type: 'string',
    },
  ],
};
