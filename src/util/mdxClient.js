import hydrate from 'next-mdx-remote/hydrate';

export const renderMdxContent = (content) => {
  return hydrate(content, {});
};
