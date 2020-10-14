import renderToString from 'next-mdx-remote/render-to-string';
import { sanityQuery } from '@util/sanity';
import components from '@util/mdxCustomComponents';

export const loadMdxContent = async (contentId) => {
  const data = await sanityQuery({
    query: `
      query($contentId: String!) {
        allMarketingCopy(where: { id: { eq: $contentId } }) {
          content
        }
      }
    `,
    variables: {
      contentId,
    },
  });

  const [pageData] = data.allMarketingCopy;

  const renderedContent = await renderToString(pageData.content, {
    components,
  });

  return renderedContent;
};
