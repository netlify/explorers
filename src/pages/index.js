import Layout from '@components/Layout';
import HomeHero from '@components/HomeHero';
import Link from 'next/link';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';

export default function Home({ missions }) {
  return (
    <Layout>
      <div>
        <HomeHero />

        <section>
          <h2>Missions</h2>
          <p>
            Here in Mission Control, you'll find missions covering all sorts of
            web development and Jamstack topics.
          </p>
          {missions.map((mission, index) => (
            <div key={index}>
              <h3>
                <Link
                  href="/learn/[slug]"
                  as={`/learn/${mission.slug.current}`}
                >
                  <a>{mission.title}</a>
                </Link>
              </h3>
              <div className="mission-description">
                {hydrate(mission.renderedDescription, { components: {} })}
              </div>
            </div>
          ))}
        </section>

        <section>
          <h2>Your progress</h2>
          <p>
            Track your progress through missions, stages, and certifications.
          </p>
          <p>
            <a href="#">Log in</a> to track your progress and earn rewards.
          </p>
        </section>
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const data = await fetch(
    'https://q8efilev.api.sanity.io/v1/graphql/production/default',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          {
            allMission {
              title
              description
              slug {
                current
              }
            }
          }
        `,
        variables: {},
      }),
    }
  ).then((response) => response.json());

  let promises = data.data.allMission.map(async (mission) => {
    let renderedDescription = await renderToString(mission.description, {
      components: {},
    });

    return { ...mission, renderedDescription };
  });

  let missions = await Promise.all(promises);

  return {
    props: { missions },
  };
};
