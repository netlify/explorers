export default {
  name: 'marketingCopy',
  title: 'Marketing Copy',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'string',
      description:
        'Define a unique identifier for this content. Example: `home-hero`',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'markdown',
    },
  ],
};
