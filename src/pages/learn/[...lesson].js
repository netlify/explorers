// /learn/{mission-name}/{stage-name}
// /learn/{mission-name}
// /learn/{stage-name}

import { Main } from "next/document";
import MissionTracker from '@components/MissionTracker';

const Lesson = ({ missionSlug }) => {
  return (
    <section>
      <h1>Lesson: {missionSlug}</h1>
      <MissionTracker />
    </section>
  );
};

export const getStaticProps = async ({ ...ctx }) => {
  // In here, we will do the logic to differentiate between
  // missions and lessons, and send props to the Lesson
  // component based on the route, and then render different
  // page types based on that!

  return {
    props: {
      missionSlug: ctx.params.lesson,
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

export default Lesson;
