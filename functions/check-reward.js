const { postToHasura } = require('./util/postToHasura');

exports.handler = async (event) => {
  console.log({ event });

  const payload = JSON.parse(event.body);
  const { new: newAchievement } = payload.event.data;

  if (newAchievement.type !== 'mission-complete') {
    return {
      statusCode: 200,
      body: 'ok',
    };
  }

  const newReward = await postToHasura({
    query: `
      mutation AddReward(
        $achievement_id: Int,
        $reward_type: String,
        $reward_data: jsonb
      ) {
        insert_rewards_one(object: {
          achievement_id: $achievement_id,
          reward_data: $reward_data,
          type: $reward_type
        }) {
          achievement_id
          id
          reward_data
          timestamp
          type
        }
      }
    `,
    variables: {
      achievement_id: newAchievement.id,
      reward_type: 'sticker pack',
      reward_data: {
        shopify: 123,
      },
    },
  });

  if (!newReward) {
    return {
      statusCode: 500,
      body: 'Oh no!',
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
    },
    body: 'Totally Ok',
  };
};
