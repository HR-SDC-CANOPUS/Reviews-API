const client = require('../index');

module.exports = (productId) => {
  const query =
      ` SELECT t.counts FROM
      (SELECT json_object_agg(r.rating, (SELECT count(rating) FROM "reviews" WHERE "product_id" = ${productId} AND rating = r.rating)) AS counts
        FROM "reviews" AS r
        WHERE "product_id" = ${productId}
        GROUP BY rating) AS t
          ;`

      // `
      // (SELECT rating FROM "reviews" WHERE "product_id" = ${productId} GROUP BY rating)
      // (SELECT count(rating) FROM "reviews" WHERE "product_id" = ${productId} GROUP BY rating)
      // `

      // ` SELECT t.counts FROM
      // (SELECT json_object_agg(r.rating, (SELECT count(rating) FROM "reviews" WHERE "product_id" = ${productId} AND rating = r.rating)) AS counts
      //   FROM "reviews" AS r
      //   WHERE "product_id" = ${productId}
      //   GROUP BY rating) AS t
      //     ;`

  return client.query(query);
}