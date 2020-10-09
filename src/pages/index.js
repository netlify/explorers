import Layout from '@components/Layout';
import HomeHero from '@components/HomeHero';
import Link from 'next/link';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import VideoCard from '@components/VideoCard';

export default function Home({ missions }) {
  const videoplaceholder = new Array(6).fill(1).map((e, i) => ({
    id: i,
    title: `Video Title ${i}`,
    coverImage: `https://via.placeholder.com/450x200?text=Woo+Jamstack+Explorers`,
    body: `Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.`,
    instructor: `Tara Manicsic`,
    slug: `learn-things`,
    avatar: `https://via.placeholder.com/30`,
  }));

  return (
    <Layout navtheme="light">
      <div>
        <HomeHero />

        <section>
          <div className="sectioncontain">
            <h2>Missions</h2>
            <p>
              Here in Mission Control, you'll find missions covering all sorts
              of web development and Jamstack topics.
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
          </div>

          <div className="row sectioncontain">
            {videoplaceholder.map((video) => (
              <VideoCard key={video.id} video={video} />
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
