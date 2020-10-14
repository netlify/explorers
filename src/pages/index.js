import Layout from '@components/Layout';
import HomeHero from '@components/HomeHero';
import MissionCard from '@components/MissionCard';
import { useMissionsState } from '@context/missions';

export default function Home() {
  const { missions } = useMissionsState();

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
              <MissionCard key={index} mission={mission} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
