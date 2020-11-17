import Layout from '@components/Layout';
import Header404 from '@components/Header404';
import { SITE_DOMAIN } from '@util/constants';

const FourOhFour = () => {
  const pageMeta = {
    title: 'Oops! You found a missing page! - Jamstack Explorers',
    description: 'Oops! It looks like this page is lost in space somewhere!',
    url: `${SITE_DOMAIN}/404`,
  };

  return (
    <Layout navtheme="dark" pageMeta={pageMeta}>
      <Header404 />
    </Layout>
  );
};

export default FourOhFour;
