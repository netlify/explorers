import Link from 'next/link';
import hydrate from 'next-mdx-remote/hydrate';
import renderToString from 'next-mdx-remote/render-to-string';
import { loadMissions, loadMissionBySlug } from '@context/missions';
import ChonkyFooter from '@components/ChonkyFooter';
import Layout from '@components/Layout';
import styles from './Mission.module.css';
import { findTwitterUrl, parseTwitterHandle } from '@util/twitter';
import { SITE_DOMAIN } from '@util/constants';

// Example: if we want to use React components in Sanity descriptions, here’s how
import Aside from '@components/mdx/Aside';

const Mission = ({ mission }) => {
  const description = hydrate(mission.renderedDescription, {
    components: {
      // Any components in here can be used in Sanity’s description field
      Aside,
    },
  });

  const instructorTwitterHandle = parseTwitterHandle(
    findTwitterUrl(mission.instructor.social)
  );

  const ogImage = `https://res.cloudinary.com/netlify/video/upload/q_auto,w_1280,h_720,c_fill,f_auto,so_2/l_text:Roboto_80_center:${mission.title},co_white,w_1000,c_fit/explorers/intro.jpg`;

  const pageMeta = {
    title: `${mission.title} - Jamstack Explorers`,
    description: `Learn about ${mission.title}. ${mission.blurb}`,
    image: ogImage,
    url: `${SITE_DOMAIN}/learn/${mission.slug.current}`,
    creator: `@${instructorTwitterHandle}` || '@netlify',
  };

  return (
    <Layout navtheme="dark" pageMeta={pageMeta}>
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
                <h3 className={styles.learn}>What you'll learn</h3>
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
            <div className={styles.missiondescription}>
              {description}
              <a
                href={`/learn/${mission.slug.current}/${mission.stages?.[0].slug.current}`}
                className={styles.bigOlButton}
              >
                Start This Mission
              </a>
            </div>
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
