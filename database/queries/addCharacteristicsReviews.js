const client = require('../index');

module.exports = ({ characteristics, reviewId }) => {
  const query =
      ` INSERT INTO characteristics_reviews (review_id, characteristics_id, value)
        SELECT review_id, characteristics_id, value FROM UNNEST ($1::int[], $2::int[], $3::int[]) AS t (review_id, characteristics_id, value)`;

  return client.query(query,
    [
      Array(Object.keys(characteristics).length).fill(reviewId),
      Object.keys(characteristics),
      Object.values(characteristics)
    ])
    .catch((err) => {
      console.log('DB INSERT ERROR: ', err);
    });
}