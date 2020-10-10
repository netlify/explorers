export default async function handler(_req, res) {
  const { data } = await fetch(
    'https://q8efilev.api.sanity.io/v1/graphql/production/default',
    {
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
    }
  ).then((response) => response.json());

  res.status(200).json(data.allStage);
}
