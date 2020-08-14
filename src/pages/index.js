import React from 'react';
import { Layout } from '../components/layout';

export default function Home({ data }) {
  return (
    <Layout>
      <h1 style={{ textAlign: 'center' }}>TODO: build Jamstack Explorers</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const data = await fetch(
    'https://q8efilev.api.sanity.io/v1/graphql/production/default',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          {
            allVideo {
              title
              slug {
                current
              }
              body
            }
          }
        `,
        variables: {},
      }),
    }
  ).then((response) => response.json());

  return {
    props: { data },
  };
};
