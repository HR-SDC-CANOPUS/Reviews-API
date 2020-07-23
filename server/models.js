const getReviews = require('../database/queries/getReviews');
const getReviewMetadata = require('../database/queries/getReviewMetadata');
const addPhotos = require('../database/queries/addPhotos');
const addReview = require('../database/queries/addReview');
const addCharacteristicsReviews = require('../database/queries/addCharacteristicsReviews');
const markReviewHelpful = require('../database/queries/markReviewHelpful');
const markReviewReported = require('../database/queries/markReviewReported');

module.exports = {
  dbGetReviews: (params) => getReviews(params),
  dbGetReviewMetadata: (productId) => getReviewMetadata(productId),
  dbAddReview: (params) => {
    return addReview(params)
    .then(({rows}) => {
      const reviewId = rows[0].id;
      addPhotos({ photos: params.photos, reviewId });
      addCharacteristicsReviews({ characteristics: params.characteristics, reviewId });
    });

  },
  dbMarkReviewHelpful: (reviewId) => markReviewHelpful(reviewId),
  dbMarkReviewReported: (reviewId) => markReviewReported(reviewId)
}