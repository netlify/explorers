const fetch = require('node-fetch');

exports.handler = async () => {
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

  return {
    statusCode: 200,
    body: JSON.stringify(data.allStage),
  }
}