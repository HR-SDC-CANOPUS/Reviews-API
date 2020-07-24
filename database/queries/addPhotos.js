const client = require('../index');

module.exports = ({ photos, reviewId }) => {
  const query =
      ` INSERT INTO photos (url, review_id)
        SELECT url, review_id FROM UNNEST ($1::text[], $2::int[]) AS t (url, review_id)`;

  return client.query(query, [ photos, Array(photos.length).fill(reviewId) ])
    .catch((err) => {
      console.log('DB INSERT ERROR: ', err);
    });
}