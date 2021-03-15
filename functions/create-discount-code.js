const { postToShopify } = require('./util/postToShopify');

exports.handler = async () => {
  const newPriceRuleAndDiscountCode = await postToShopify({
    query: `
mutation priceRuleCreate($priceRule: PriceRuleInput!, $priceRuleDiscountCode:PriceRuleDiscountCodeInput!) {
  priceRuleCreate(priceRule: $priceRule, priceRuleDiscountCode: $priceRuleDiscountCode) {
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
}

    `,
    // TODO: Make values dynamic
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
          start: '2021-03-08',
        },
        value: {
          percentageValue: -100,
        },
      },
      priceRuleDiscountCode: {
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
