const { postToShopify } = require('./postToShopify');

exports.createShopifyDiscountCode = async () => {
  const newDiscountCode = await postToShopify({
    query: `
      mutation priceRuleCreate(
        $priceRule: PriceRuleInput!,
        $priceRuleDiscountCode: PriceRuleDiscountCodeInput!
      ) {
        priceRuleCreate(
          priceRule: $priceRule,
          priceRuleDiscountCode: $priceRuleDiscountCode
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
          start: '2021-03-08',
        },
        value: {
          percentageValue: -100,
        },
      },
      priceRuleDiscountCode: {
        code: 'phil-12843',
      },
    },
  });

  return newDiscountCode;
};
