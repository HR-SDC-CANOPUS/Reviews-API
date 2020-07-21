const client = require('../index');

module.exports = ({ productId, rating, summary, body, recommend, name, email }) => {
  const query =
      ` INSERT INTO "reviews"
        ("product_id", "rating", "date", "summary", "body", "recommend", "reviewer_name", "reviewer_email", "helpfulness")
        VALUES
        (${productId}, ${rating}, current_timestamp, '${summary}', '${body}', ${recommend}, '${name}', '${email}', 0)
        RETURNING id;`

  return client.query(query);
}