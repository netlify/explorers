import Layout from '@components/Layout';
import styles from './About.module.css';
import { SITE_DOMAIN } from '@util/constants';

export default function AboutPage() {
  const pageMeta = {
    title: 'About - Jamstack Explorers',
    description:
      "Learn about what Jamstack Explorers is and why you'll want to bookmark it!",
    url: `${SITE_DOMAIN}/about`,
  };

  return (
    <Layout navtheme="dark" pageMeta={pageMeta}>
      <div>
        <section className="section-contain is-dark px2">
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
            <img
              src="/user-profile.jpg"
              alt="user profile page on jamstack explorers"
              className={styles.aboutimg}
            />
            <p>
              Once you've completed 3 missions (courses), we will give you a {}
              <strong>Certificate of Completion</strong> for your astounding
              efforts.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
