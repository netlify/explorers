const { postToShopify } = require('./postToShopify');
const { v4: uuidv4 } = require('uuid');

exports.createShopifyDiscountCode = async (achievementId) => {
  try {
    const newDiscountCode = await postToShopify({
      query: `
        mutation CreatePriceRule(
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
          title: `Free Stickers - Achievement #${achievementId}`,
          usageLimit: 1,
          validityPeriod: {
            start: new Date(),
          },
          value: {
            percentageValue: -100,
          },
        },
        priceRuleDiscountCode: {
          code: uuidv4(),
        },
      },
    });

    return newDiscountCode;
  } catch (error) {
    console.error(`Shopify Discount Code Creation: `, error);
  }
};
