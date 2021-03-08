// TODO: Move to separate repo so that it's not permanently exposed

const { postToShopify } = require('./util/postToSpotify');

exports.handler = async (event) => {
  const payload = JSON.parse(event.body);

  const newPriceRule = await postToShopify({
    query: `
      mutation priceRuleCreate($priceRule: PriceRuleInput!) {
        priceRuleCreate(priceRule: $priceRule) {
          priceRule {
            id
          }
          priceRuleDiscountCode {
            id
          }
          priceRuleUserErrors {
            code
            field
            message
          }
        }
      }
    `,
    variables: {
      priceRule: {
        title: 'Free Stickers',
        target: 'LINE_ITEM',
        allocationMethod: 'EACH',
        value: {
          percentageValue: -100,
        },
        customerSelection: {
          forAllCustomers: true,
        },
        itemEntitlements: {
          productIds: ['gid://shopify/Product/4871257882763'],
        },
        validityPeriod: {
          start: '2021-03-08',
        },
      },
    },
  });

  if (!newPriceRule) {
    return {
      statusCode: 500,
      body: 'Oh no! Creating a price rule did not work :(',
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

exports.handler = async ({ query, variables }) => {
  const result = await fetch(process.env.SHOPIFY_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'X-Shopify-Access-Token': process.env.SHOPIFY_API_KEY,
    },
    body: JSON.stringify({
      price_rule: {
        title: 'Free Stickers',
        target_type: 'line_item',
        target_selection: 'entitled',
        allocation_method: 'each',
        value_type: 'percentage',
        value: '-100.0',
        customer_selection: 'all',
        entitled_product_ids: [4871257882763],
        starts_at: '2021-03-05T00:00:00Z',
      },
    }),
  }).then((res) => {
    console.log({ res });

    res.json();
  });

  console.log({ result });

  if (!result || !result.data) {
    console.error(result);
    return {
      statusCode: 500,
      body: 'Oh no!',
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result.data),
  };
};
