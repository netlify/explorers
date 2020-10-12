import Layout from '@components/Layout';
import VideoCard from '@components/VideoCard';
import { useMissionsState } from '@context/missions';

export default function MissionsPage() {
  const { missions } = useMissionsState();

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
      </div>
    </Layout>
  );
}
