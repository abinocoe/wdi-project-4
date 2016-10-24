const express = require('express');
const router = express.Router();

const chatsController = require('../controllers/chats');

router.route("/upload")
  .post(chatsController.upload);

module.exports = router;
