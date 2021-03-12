const { postToHasura } = require('./util/postToHasura');

exports.handler = async (event) => {
  const payload = JSON.parse(event.body);
  const { new: newAchievement } = payload.event.data;

  /**
   * Step 1: Check whether achievement meets criteria
   * for generating a reward. If not, stop function
   * and move on.
   */
  if (newAchievement.type !== 'mission-complete') {
    return {
      statusCode: 200,
      body: 'OK! No reward needed!',
    };
  }

  /**
   * Step 2: Send request to generate reward.
   * TODO: Create real reward with Shopify API
   */
  const newReward = await postToHasura({
    query: `
      mutation AddReward(
        $achievement_id: Int!,
        $reward_type: String!,
        $reward_data: jsonb!
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
      body: 'Oh no! Check reward ran into an error!',
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
    },
    body: 'Success! Reward was created successfully!',
  };
};
