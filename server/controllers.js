const models = require('./models');

module.exports = {

  getReviews: (req, res) => {
    const productId = req.params.product_id;
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    const sort = req.query.sort || 'newest';

    res.send({productId, page, count, sort});
  },

  getReviewMetadata: (req, res) => {
    const productId = req.params.product_id;

  },

  addReview: (req, res) => {
    const productId = req.params.product_id;
    const data = req.body;

  },

  markReviewHelpful: (req, res) => {
    const reviewId = req.params.review_id;

  },

  markReviewReported: (req, res) => {
    const reviewId = req.params.review_id;

  }

}