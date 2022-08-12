const express = require('express');
const router = express.Router();
const controller = require('../controllers/reviewer.controller');

module.exports = function () {
  router.post('/add', controller.addDecisions);
  router.delete('/:id', controller.deleteReview);
  router.get('/', controller.getAllReviews);
  return router;
}