const { postToHasura } = require('./util/postToHasura');

exports.handler = async (event) => {
  const params = JSON.parse(event.body);
  const achievements = await postToHasura({
    query: `query GetUserAchievement($user_id: String) {
  achievements(where: {user_id: {_eq: $user_id}, }) {
    event_data
    type
    description
    rewards{is_claimed id reward_data type }
  }
}
`,

    variables: {
      user_id: `${params.user_id}`,
    },
  });

  if (!achievements) {
    return {
      statusCode: 200,
      body: "You don't have any achievements yet",
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
    },
    body: JSON.stringify(achievements),
  };
};
