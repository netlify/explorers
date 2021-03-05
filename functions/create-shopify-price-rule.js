const fetch = require('node-fetch');

exports.createShopifyPriceRule = async ({ query, variables }) => {
  const result = await fetch(process.env.SHOPIFY_API_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      "price_rule": {
        "title": "Free Stickers",
        "target_type": "line_item",
        "target_selection": "entitled",
        "allocation_method": "each",
        "value_type": "percentage",
        "value": "-100.0",
        "customer_selection": "all",
        "entitled_product_ids": [
          4871257882763
        ],
        "starts_at": "2021-03-05T00:00:00Z"
      }
    }),
  }).then((res) => res.json());

  if (!result || !result.data) {
    console.error(result);
    return false;
  }

  return result.data;
};
