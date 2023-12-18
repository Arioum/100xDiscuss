const router = require('express').Router();

const UserAuthController = require('../controller/userAuth.controller');

router.post('/signin', UserAuthController.userLogin);
router.post(
  '/',
  UserAuthController.requireAuthentication,
  UserAuthController.userVerify
);

module.exports = router;
