const { postToHasura } = require('./util/postToHasura');

exports.handler = async (event) => {
  const payload = JSON.parse(event.body);
  const { discount_codes: discountCodes } = payload;

  const allRewards = await postToHasura({
    query: `
      query RewardsList {
        rewards {
          reward_data
          id
        }
      }
    `,
  });

  discountCodes.forEach(async (discountCode) => {
    const discountCodeMatch = allRewards.rewards.find(
      (item) => item.reward_data.code === discountCode
    );

    if (discountCodeMatch) {
      await postToHasura({
        query: `
          mutation MyMutation($reward_id: Int!) {
            update_rewards(
              where: {id: {_eq: $reward_id}},
              _set: {is_claimed: true}
            ) {
              returning {
                id
                is_claimed
                reward_data
              }
            }
          }
        `,
        variables: {
          reward_id: discountCodeMatch.id,
        },
      });
    }
  });

  return {
    statusCode: 200,
    body: 'Checked reward',
  };
};
