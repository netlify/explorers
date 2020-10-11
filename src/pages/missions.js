import Layout from '@components/Layout';
import Link from 'next/link';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import VideoCard from '@components/VideoCard';
import UserDial from '@components/UserDial';
import UserActivityGraph from '@components/UserActivityGraph';

export default function MissionsPage({ missions }) {
  return (
    <Layout navtheme="dark">
      <div>
        <section className="intro">
          <div className="sectioncontain">
            <h1>Your Missions</h1>
            <h2>Should you choose to accept them...</h2>
            <p>
              Here in Mission Control, you'll find missions covering all sorts
              of web development and Jamstack topics.
            </p>
          </div>
        </section>

        <section>
          <div className="row sectioncontain">
            {missions.map((mission, index) => (
              <VideoCard key={index} video={mission} />
            ))}
          </div>
        </section>

        <section>
          <div className="row">
            <UserDial />
            <UserActivityGraph />
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
