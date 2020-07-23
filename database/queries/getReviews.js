const client = require('../index');

module.exports = ({ productId, page, count, sort }) => {

  if (sort === 'newest') sort = 'order by r2.date desc';
  if (sort === 'helpful') sort = 'order by r2.helpfulness desc';
  if (sort === 'relevant') sort = 'order by r2.helpfulness desc, r2.date desc';

  const query = `
        select r2.id as review_id, r2.rating, r2.summary, r2.recommend, r2.response, r2.body, r2.date, r2.reviewer_name, r2.helpfulness,
          (
          select array_to_json(coalesce(array_agg(photo), array[]::record[]))
          from
            (
            select p.id, p.url
            from reviews r
            inner join photos p
            on r.id = p.review_id
            where p.review_id = r2.id
            ) photo
          ) as photos
        from reviews r2
        where r2.product_id = ${productId} and r2.reported <> true
        ${sort}
        limit ${count}
        offset ${count * page - count}
        ;`;

  return client.query(query);
};
