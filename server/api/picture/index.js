'use strict';

var express = require('express');
var controller = require('./picture.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/page/:page/perpage/:perpage', controller.index);

module.exports = router;
