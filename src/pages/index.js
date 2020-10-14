import { sanityQuery } from '@util/sanity';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';

import Layout from '@components/Layout';
import HomeHero from '@components/HomeHero';
import MissionCard from '@components/MissionCard';
import { useMissionsState } from '@context/missions';

export default function Home({ content }) {
  const { missions } = useMissionsState();
  const pageContent = hydrate(content, {});

  return (
    <Layout navtheme="light">
      <div>
        <HomeHero />

        <section className="margintop-lg">
          <div className="sectioncontain">{pageContent}</div>

          <div className="row sectioncontain">
            {missions.map((mission, index) => (
              <MissionCard key={index} mission={mission} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await sanityQuery({
    query: `
      query($contentId: String!) {
        allMarketingCopy(where: { id: { eq: $contentId } }) {
          content
        }
      }
    `,
    variables: {
      contentId: 'jamstack-mission-control',
    },
  });

  const [pageData] = data.allMarketingCopy;

  const renderedContent = await renderToString(pageData.content, {});

  return {
    props: {
      content: renderedContent,
    },
  };
}
