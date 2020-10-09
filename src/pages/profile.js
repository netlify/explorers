import Layout from '@components/Layout';
import Hero from '@components/Hero';

export default function Profile() {
  return (
    <Layout>
      <Hero>
        <h1>Explorer Sarah</h1>
        <img src="http://placekitten.com/250/250" alt={`explorer's pic`} />
      </Hero>
      <section>blah blah make edits here</section>
    </Layout>
  );
}
