import Layout from '@components/Layout';
import styles from './About.module.css';

export default function AboutPage() {
  return (
    <Layout navtheme="dark">
      <div>
        <section>
          <div className={styles.about}>
            <h1>About</h1>
            <p>
              This project was built so that anyone can ramp up and learn core
              premises of Jamstack development on myriad frameworks and
              metaframeworks.
            </p>
            <p>
              To track progress through the courses, you can log in with the
              button on the top right, and we'll use your Netlify account to
              show how far you've come in learning a particular topic.
            </p>
            <p>
              Once you've completed 3 missions (courses), we will give you a
              certificate of completion for your astounding efforts.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
