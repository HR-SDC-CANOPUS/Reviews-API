const client = require('../index');

module.exports = (reviewId) => {
  const query =
      ` UPDATE "reviews"
        SET "helpfulness" = "helpfulness" + 1
        WHERE id = ${reviewId};`

  return client.query(query);
}