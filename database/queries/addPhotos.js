const client = require('../index');

module.exports = ({ photos }) => {
  const query =
      ` SELECT T1.id, T1.rating, T1.summary, T1.recommend, T1.response, T1.body, T1.date, T1.reviewer_name, T1.helpfulness, (T2.url)

        FROM (SELECT * FROM "reviews" WHERE "product_id" = '${productId}' AND "reported" = 'false') AS T1
        JOIN (SELECT * FROM "photos") AS T2
        ON T1.id = T2.review_id
        ORDER BY "${sort}" DESC
        LIMIT ${count}
        OFFSET ${(count * page) - count}
        ;`

  return client.query(query);
}