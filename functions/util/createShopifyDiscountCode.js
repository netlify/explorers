const { postToShopify } = require('./postToShopify');
const { v4: uuidv4 } = require('uuid');

exports.createShopifyDiscountCode = async (achievementId) => {
  try {
    const newDiscountCode = await postToShopify({
      query: `
        mutation CreateDiscountCode(
          $discountParams: DiscountCodeBasicInput!
        ) {
          discountCodeBasicCreate(
            basicCodeDiscount: $discountParams
          ) {
            userErrors {
              field
              message
              code
            }
            codeDiscountNode {
              id
              codeDiscount {
                ... on DiscountCodeBasic {
                  title
                  summary
                  status
                  codes(first: 10) {
                    edges {
                      node {
                        code
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        discountParams: {
          title: 'Jamstack Explorers — Mission Complete Reward',
          startsAt: new Date(),
          usageLimit: 1,
          appliesOncePerCustomer: true,
          customerSelection: {
            all: true,
          },
          code: uuidv4(),
          customerGets: {
            value: {
              discountAmount: {
                amount: 2.0,
                appliesOnEachItem: false,
              },
            },
            items: {
              products: {
                productsToAdd: ['gid://shopify/Product/4871257882763'],
              },
            },
          },
        },
      },
    });

    return newDiscountCode;
  } catch (error) {
    console.error(`Shopify Discount Code Creation: `, error);
  }
};
