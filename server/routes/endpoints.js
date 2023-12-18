const router = require('express').Router();

const UserAuthController = require('../controller/userAuth.controller');

router.get('/', (req, res) => {
  res.send('100xDiscuss server says Hi');
});

router.post('/signin', UserAuthController.userLogin);

module.exports = router;
