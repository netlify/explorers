const { postToShopify } = require('./util/postToShopify');

exports.handler = async (event) => {
  const payload = JSON.parse(event.body);

  console.log({ event });
  console.log({ payload });

  const newPriceRuleAndDiscountCode = await postToShopify({
    query: `
      mutation priceRuleCreate(
        $priceRule: PriceRuleInput!,
        $priceRuleDiscountCode:PriceRuleDiscountCodeInput!
      ) {
          priceRule {
            id
          }
          priceRuleDiscountCode {
            id
            code
            usageCount
          }
          priceRuleUserErrors {
            code
            field
            message
          }
        }
    `,
    variables: {
      priceRule: {
        allocationMethod: 'EACH',
        customerSelection: {
          forAllCustomers: true,
        },
        itemEntitlements: {
          productIds: ['gid://shopify/Product/4871257882763'],
        },
        target: 'LINE_ITEM',
        title: 'Free Stickers',
        usageLimit: 1,
        validityPeriod: {
          // TODO: Update dynamic date
          start: '2021-03-08',
        },
        value: {
          percentageValue: -100,
        },
      },
      priceRuleDiscountCode: {
        // TODO: Create unique discount code
        code: 'test456',
      },
    },
  });

  if (!newPriceRuleAndDiscountCode) {
    return {
      statusCode: 500,
      body: 'Oh no! Creating a price rule did not work :(',
    };
  }

  // const updateRewardsInfo = await postToHasura({
  //   query: `
  //     mutation MyMutation($reward_data: jsonb!) {
  //       update_rewards(_set: {reward_data: $reward_data}, where: {id: {_eq: 41}}) {
  //         affected_rows
  //         returning {
  //           id
  //           reward_data
  //         }
  //       }
  //     }
  //   `,
  //   variables: {
  //     reward_data: {
  //       discountCode: 'test123',
  //       claimed: 0,
  //     },
  //   },
  // });

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
