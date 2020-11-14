import Layout from '@components/Layout';
import Header404 from '@components/Header404';

const FourOhFour = () => {
  const pageMeta = {
    title: "Jamstack Explorers - Oops! It's a 404!",
  };

  return (
    <Layout navtheme="dark" pageMeta={pageMeta}>
      <Header404 />
    </Layout>
  );
};

export default FourOhFour;
