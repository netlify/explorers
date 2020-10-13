export const sanityQuery = async ({ query, variables = {} }) => {
  const { data } = await fetch(process.env.NEXT_PUBLIC_SANITY_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  }).then((response) => response.json());

  return data;
};
