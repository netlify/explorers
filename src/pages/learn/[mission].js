import Link from 'next/link';
import hydrate from 'next-mdx-remote/hydrate';
import renderToString from 'next-mdx-remote/render-to-string';
import { loadMissions, loadMissionBySlug } from '@context/missions';
import ChonkyFooter from '@components/ChonkyFooter';
import Layout from '@components/Layout';
import styles from './Mission.module.css';

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
    <Layout navtheme="dark">
      <section className="intro">
        <div className="section-contain">
          <h1>This Mission: {mission.title}</h1>
          <div className={styles.missiondescriptioninstructor}>
            <img
              src={mission.instructor.avatar?.asset?.url}
              className="avatar-lg"
            />
            <span className={styles.instructor}>
              Instructor: <strong>{mission.instructor.name}</strong>
            </span>
          </div>
          <div className={styles.missiontout}>
            <div
              className={styles.card}
              style={{
                backgroundImage: `url(${mission.coverImage.asset.url})`,
              }}
            ></div>
            <div className={`${styles.missionblurb} is-dark`}>
              <p>{mission.blurb}</p>
              <div>
                <h4>
                  This mission has {mission.stages?.length} stages to explore:
                </h4>
                <ul>
                  {mission.stages?.map((stage) => (
                    <li key={stage._id}>
                      <Link
                        href={`/learn/${mission.slug.current}/${stage.slug.current}`}
                      >
                        <a>{stage.title}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.missiondescription}>{description}</div>
          </div>
        </div>
      </section>

      <ChonkyFooter mission={mission} />
    </Layout>
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
