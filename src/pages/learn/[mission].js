// /learn/{mission-name}/{stage-name}
// /learn/{mission-name}
// /learn/{stage-name}

import { Main } from 'next/document';
import dynamic from 'next/dynamic';
import MissionTracker from '@components/MissionTracker';
const VideoPlayer = dynamic(() => import('@components/VideoPlayer'), {
  ssr: false,
  loading: () => <p>some skeleton sarah will make all pretty</p>,
});

const Mission = ({ missionSlug }) => {
  return (
    <section>
      <h1>Mission: {missionSlug}</h1>
      <p>test</p>
      <VideoPlayer />
      <MissionTracker />
    </section>
  );
};

// /learn/nextjs/

export const getStaticProps = async ({ ...ctx }) => {
  // In here, we will do the logic to differentiate between
  // missions and Missions, and send props to the Mission
  // component based on the route, and then render different
  // page types based on that!

  return {
    props: {
      missionSlug: ctx.params.mission,
    },
  };
};

export const getStaticPaths = async () => {
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

  // Getting the mission paths from the slugs
  let paths = data.data.allMission.map((p) => {
    return `/learn/${p.slug.current}`;
  });

  return {
    paths,
    fallback: false,
  };
};

export default Mission;
