import Layout from '@components/Layout';
import HomeHero from '@components/HomeHero';
import renderToString from 'next-mdx-remote/render-to-string';
import VideoCard from '@components/VideoCard';

export default function Home({ missions }) {
  return (
    <Layout navtheme="light">
      <div>
        <HomeHero />

        <section className="margintop-lg">
          <div className="sectioncontain">
            <h2>Missions</h2>
            <p>
              Here in Mission Control, you'll find missions covering all sorts
              of web development and Jamstack topics.
            </p>
          </div>

          <div className="row sectioncontain">
            {missions.map((mission, index) => (
              <VideoCard key={index} video={mission} />
            ))}
          </div>
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
              coverImage {
                asset {
                  url
                }
              }
              instructor {
                name
                avatar {
                  asset {
                    url
                  }
                }
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
