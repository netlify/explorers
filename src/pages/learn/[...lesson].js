import { useRouter } from 'next/router';

// /learn/{mission-name}/{lesson-name}
// /learn/{mission-name}
// /learn/{lesson-name}

const Lesson = ({ data }) => {
  const router = useRouter();
  const { asPath } = router;

  return <p>Lesson: {asPath}</p>;
};

export const getStaticProps = async () => {
  return {
    props: {},
  };
};

export const getStaticPaths = async () => {
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
            allMission {
              slug {
                current
              }
            }
          }
        `,
        variables: {},
      }),
    }
  ).then((response) => response.json());

  // Getting the mission paths from the slugs
  let paths = data.data.allMission.map((p) => {
    return `/learn/${p.slug.current}`;
  });

  return {
    paths,
    fallback: false,
  };
};

export default Lesson;
