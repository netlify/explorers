/**
 * This function is called by the Shopify webhook
 * whenever an order is created.
 */

const { postToHasura } = require('./util/postToHasura');

exports.handler = async (event) => {
  const payload = JSON.parse(event.body);
  const { discount_codes: discountCodes } = payload;

  console.log({ discountCodes, discount_codes: payload.discount_codes });

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

  if (!discountCodes.length > 0) {
    console.error('Failed to retrieve discount codes from Shopify');
    return {
      statusCode: 200,
      body: 'Failed to retrieve discount codes from Shopify',
    };
  }

  if (!allRewards.rewards.length > 0) {
    console.error('Failed to retrieve rewards from Hasura');
    return {
      statusCode: 500,
      body: 'Failed to retrieve rewards from Hasura',
    };
  }

  discountCodes.forEach(async (discountCode) => {
    try {
      const discountCodeMatch = allRewards.rewards.find(
        (item) => item.reward_data.code === discountCode.code
      );

      if (discountCodeMatch) {
        console.log('Found a discount code!');
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
    } catch (err) {
      console.error('Failure to update rewards: ', err);
    }
  });

  console.log('hello?');

  return {
    statusCode: 200,
    body: 'Checked reward',
  };
};
