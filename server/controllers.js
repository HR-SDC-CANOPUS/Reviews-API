const redis = require('redis');
const models = require('./models');

const redisClient = redis.createClient();

redisClient.on('error', (err) => {
  console.log("Error " + err);
});

module.exports = {
  getReviews: (req, res) => {
    const productId = req.params.product_id;
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    const sort = req.query.sort || 'newest';
    const redisQuery = `getReviews:${productId}-${page}-${count}-${sort}`;

    redisClient.get(redisQuery, (err, data) => {
      if (data) {
        res.send(JSON.parse(data));
      } else {

        models
        .dbGetReviews({ productId, page, count, sort })
        .then((data) => {
          redisClient.setex(redisQuery, 3600, JSON.stringify({ product: productId, page, count, results: data.rows }));
          res.send({ product: productId, page, count, results: data.rows });
        })
        .catch((err) => {
          console.log('DB ERROR: ', err);
          res.sendStatus(404);
        });

      }
    })
  },

  getReviewMetadata: (req, res) => {
    const productId = req.params.product_id;
    const redisQuery = `getReviewMetadata:${productId}`;

    redisClient.get(redisQuery, (err, data) => {
      if (data) {
        res.send(JSON.parse(data));
      } else {

        models
        .dbGetReviewMetadata(productId)
        .then((data) => {
          redisClient.setex(redisQuery, 3600, JSON.stringify(data));
          res.send(data);
        })
        .catch((err) => {
          console.log('DB ERROR: ', err);
          res.sendStatus(404);
        });
      }
    });


  },

  addReview: (req, res) => {
    const params = { ...req.body, productId: req.params.product_id };

    models
      .dbAddReview(params)
      .then((data) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log('DB ERROR: ', err);
        res.sendStatus(404);
      });
  },

  markReviewHelpful: (req, res) => {
    const reviewId = req.params.review_id;

    models
      .dbMarkReviewHelpful(reviewId)
      .then((data) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log('DB ERROR: ', err);
        res.sendStatus(404);
      });
  },

  markReviewReported: (req, res) => {
    const reviewId = req.params.review_id;

    models
      .dbMarkReviewReported(reviewId)
      .then((data) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log('DB ERROR: ', err);
        res.sendStatus(404);
      });
  },
};
