const express = require('express');
const router = express.Router();
const controller = require('../controllers/usertype.controller');

module.exports = function () {
  router.post('/Utype', controller.createType);
  router.get('/', controller.getAllTypes);
  return router;
}