const express = require('express');
const router = express.Router();

const analyses = require('../controllers/analyses');

// router.route("/upload")
//   .post(chatsController.upload);

router.route("/analyses/:id")
  .get(analyses.show);

module.exports = router;
