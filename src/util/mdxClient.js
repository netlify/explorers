import hydrate from 'next-mdx-remote/hydrate';
import components from '@util/mdxCustomComponents';

export const renderMdxContent = (content) => {
  return hydrate(content, { components });
};
