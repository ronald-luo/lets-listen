var controller = require('../controllers/')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', controller.index);

/* download video. */
router.post('/youtube-download', controller.download);


module.exports = router;
