const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const auth = require('../middleware/auth')

module.exports = function () {
  router.post('/register', controller.register);
  router.post('/login', controller.login);
  router.post('/tokenvalid', controller.tokenValid);
  router.get('/', auth, controller.userLog);
  router.delete('/delete', auth, controller.Userdelete);
  return router;
}