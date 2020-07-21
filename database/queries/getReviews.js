const client = require('../index');

module.exports = ({ productId, page, count, sort }) => {
  const query =
      ` SELECT T1.id, T1.rating, T1.summary, T1.recommend, T1.response, T1.body, T1.date, T1.reviewer_name, T1.helpfulness, (T2.url)

        FROM (SELECT * FROM "reviews" WHERE "product_id" = '${productId}' AND "reported" = 'false') AS T1
        JOIN (SELECT * FROM "photos") AS T2
        ON T1.id = T2.review_id
        ORDER BY "${sort}" DESC
        LIMIT ${count}
        OFFSET ${(count * page) - count}
        ;`

  // const query2 = `
  //   SELECT id, t.tag_array
  //   FROM reviews r, LATERAL (
  //     SELECT ARRAY (
  //       SELECT t.url
  //       FROM photos p
  //       JOIN tags t ON t.id = p.review_id
  //       WHERE p
  //     ) AS tag_array
  //   ) t;
  // `
        // EXAMPLE
        // SELECT id, title AS item_title, t.tag_array
        // FROM   items i, LATERAL (  -- this is an implicit CROSS JOIN
        //   SELECT ARRAY (
        //       SELECT t.title
        //       FROM   items_tags it
        //       JOIN   tags       t  ON t.id = it.tag_id
        //       WHERE  it.item_id = i.id
        //       ) AS tag_array
        //   ) t;

    //  return Promise.resolve(query);

  return client.query(query);
}