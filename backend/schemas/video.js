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
    {
      name: 'cloudinaryVideo',
      title: 'Video',
      type: 'cloudinary.video',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      description:
        'Leave this blank to have a poster auto-generated. In most cases you SHOULD let this auto-generate.',
      type: 'image',
    },
    {
      name: 'instructor',
      title: 'Instructor',
      type: 'reference',
      to: [
        {
          type: 'instructor',
        },
      ],
    },
  ],

  preview: {
    select: {
      title: 'title',
      slug: 'slug',
    },
    prepare(selection) {
      const { title, slug } = selection;
      return {
        title: `${title}`,
        subtitle: `video slug: ${slug.current}`,
      };
    },
  },
};
