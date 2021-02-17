const fetch = require('node-fetch');

exports.postToHasura = async ({ query, variables }) => {
  const result = await fetch(process.env.HASURA_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'X-Hasura-Admin-Secret': process.env.HASURA_ADMIN_SECRET,
      'X-Hasura-Role': 'app',
    },
    body: JSON.stringify({ query, variables }),
  }).then((res) => res.json());

  if (!result || !result.data) {
    console.error(result);
    return false;
  }

  return result.data;
};
