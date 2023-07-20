export default async function handler(_req, res) {
  const { data } = await fetch(process.env.NEXT_PUBLIC_SANITY_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        {
          allStage {
            _id
            title
          }
        }
      `,
      variables: {},
    }),
  }).then((response) => response.json());

  res.status(200).json(data.allStage);
}
