import { sanityQuery } from '@util/sanity';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';

import Layout from '@components/Layout';
import HomeHero from '@components/HomeHero';
import MissionCard from '@components/MissionCard';
import { useMissionsState } from '@context/missions';

export default function Home({ title, content }) {
  const { missions } = useMissionsState();
  const pageContent = hydrate(content, {});

  return (
    <Layout navtheme="light">
      <div>
        <HomeHero />

        <section className="margintop-lg">
          <div className="sectioncontain">
            <h2>{title}</h2>
            {pageContent}
          </div>

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
      {
        allMarketingCopy(where: { pagePath: { eq: "/" } }) {
          title
          content
          pagePath
        }
      }
    `,
    variables: {
      path: '/',
    },
  });

  const [pageData] = data.allMarketingCopy;

  const renderedContent = await renderToString(pageData.content, {});

  return {
    props: {
      title: pageData.title,
      content: renderedContent,
    },
  };
}
