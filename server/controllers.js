const models = require('./models');

module.exports = {

  getReviews: (req, res) => {
    const productId = req.params.product_id;
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    const sort = req.query.sort || 'newest';

    models.dbGetReviews({ productId, page, count, sort })
    .then((data) => {
      res.send(data.rows);
    })
    .catch((err) => {
      console.log('DB ERROR: ', err);
      res.sendStatus(404);
    })
  },

  getReviewMetadata: (req, res) => {
    const productId = req.params.product_id;

  },

  addReview: (req, res) => {
    const params = { ...req.body, productId: req.params.product_id };

    models.dbAddReview(params)
    .then((data) => {
      console.log(data);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('DB ERROR: ', err);
      res.sendStatus(404);
    })
  },

  markReviewHelpful: (req, res) => {
    const reviewId = req.params.review_id;

  },

  markReviewReported: (req, res) => {
    const reviewId = req.params.review_id;

  }

}