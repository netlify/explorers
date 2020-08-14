export default {
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'body',
      title: 'Body',
      type: 'markdown',
      options: {
        minRows: 20,
      },
    },
  ],

  preview: {
    select: {
      title: 'title',
      slug: 'slug',
    },
    prepare(selection) {
      const { slug } = selection;
      return {
        subtitle: `cool video at ${slug.current}!`,
      };
    },
  },
};
