import hydrate from 'next-mdx-remote/hydrate';
import renderToString from 'next-mdx-remote/render-to-string';
import Link from 'next/link';
import { loadMissions, loadMissionBySlug } from '@context/missions';

// Example: if we want to use React components in Sanity descriptions, here’s how
import Aside from '@components/mdx/Aside';

const Mission = ({ mission }) => {
  const description = hydrate(mission.renderedDescription, {
    components: {
      // Any components in here can be used in Sanity’s description field
      Aside,
    },
  });

  return (
    <section>
      <h1>Mission: {mission.title}</h1>
      <div>{description}</div>
      <ul>
        {mission.stages?.map((stage) => (
          <li key={stage._id}>
            <Link href={`/learn/${mission.slug.current}/${stage.slug.current}`}>
              <a>{stage.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export const getStaticProps = async ({ params }) => {
  const mission = await loadMissionBySlug(params.mission);

  const renderedDescription = await renderToString(mission.description, {
    components: {
      // MDX components have to be passed in both locations
      Aside,
    },
  });

  return {
    props: {
      mission: { ...mission, renderedDescription },
    },
  };
};

export const getStaticPaths = async () => {
  const missions = await loadMissions();

  return {
    paths: missions.map((mission) => `/learn/${mission.slug.current}`),
    fallback: false,
  };
};

export default Mission;
