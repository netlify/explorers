/*

HOW THIS WORKS

whenever a new entry in the achievement table is created, this
function will be called with a payload:

// TODO get a copy of Hasura's event payload
// this will look very similar to the check-achievement.js payload

if the achievement doesn't match Jamstack Explorers reward conditions,
return 200 OK

if it _might_ match JE reward conditions, check to see if it does,
then generate appropriate rewards:

- hit the Shopify API to generate a discount code

update the achievements table to include the reward:

{
  ...originalEvent,
  data: {
    ...originalEvent.data,
    rewards: [
      ...originalEvent.data.rewards,
      {
        type: 'swag_discount_code',
        discount_code: <whatever Shopify generates>,
        description: 'Free Sticker Pack for Completing a Mission',
        // this is optional. if there's a next action for the reward, this URL takes them there
        actionUrl: 'https://swag.netlify.com?code=<shopify_coupon_code>',
        callToAction: 'Claim Your Sticker Pack',
      }
    ]
  }
}

OPEN QUESTION: can we extend JSONB with Hasura actions?

*/

exports.handler = async (event) => {
  console.log({ event });

  const payload = JSON.parse(event.body);
  const { new: relatedAchievement } = payload.event.data;

  console.log({ relatedAchievement });

  console.log('This event hook was called 123!');

  return {
    statusCode: 200,
    body: 'ok',
  };
};
