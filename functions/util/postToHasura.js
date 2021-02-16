const fetch = require('node-fetch');

module.exports = {
  postToHasura: async ({ hasuraQuery, hasuraVariables }) => {
    await fetch(process.env.HASURA_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'X-Hasura-Admin-Secret': process.env.HASURA_ADMIN_SECRET,
        'X-Hasura-Role': 'app',
      },
      body: JSON.stringify({
        query: hasuraQuery,
        variables: hasuraVariables,
      }),
    }).then((res) => {
      console.log(res.json());
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
      },
      body: 'OK',
    };
  },
};
