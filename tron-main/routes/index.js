var express = require('express');
var router = express.Router();

const indexController = require('../controllers/index')

/* GET home page. */
router.get('/', indexController.get);

router.post('/register', indexController.register)
module.exports = router;
