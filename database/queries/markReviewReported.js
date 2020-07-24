const client = require('../index');

module.exports = (reviewId) => {
  const query =
      ` UPDATE "reviews"
        SET "reported" = ${true}
        WHERE id = ${reviewId};`

  return client.query(query);
}