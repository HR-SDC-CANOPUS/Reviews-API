const queries = require('../database/queries/');

module.exports = {
  dbGetReviews: () => queries.temp,
  dbGetReviewMetadata: () => queries.temp,
  dbAddReview: () => queries.temp,
  dbMarkReviewHelpful: () => queries.temp,
  dbMarkReviewReported: () => queries.temp
}