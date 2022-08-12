const express = require('express');
const router = express.Router();
const controller = require('../controllers/edit.controller');

module.exports = function () {
  router.post('/create', controller.createPage);
  router.put('/:id', controller.updatePage);
  router.delete('/:id', controller.deletePage);
  router.get('/', controller.getAllPages);
  router.get('/:id', controller.getConForPage);
  // router.get('/', controller.getDT);
  return router;
}