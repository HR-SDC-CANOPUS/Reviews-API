const getReviews = require('../database/queries/getReviews');
const addPhotos = require('../database/queries/addPhotos');
const addReview = require('../database/queries/addReview');

const queries = () => {};

module.exports = {
  dbGetReviews: (params) => getReviews(params),
  dbGetReviewMetadata: () => queries,
  dbAddReview: (params) => {

    return addReview(params)
    .then(({rows}) => {
      const reviewId = rows[0].id;

      // add photos
      // addPhotos({ photos: params.photos, reviewId });

      // add characteristics
      // return addCharacteristics()

    });

  },
  dbMarkReviewHelpful: () => queries,
  dbMarkReviewReported: () => queries
}