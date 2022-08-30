var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    // GET the dogs
});

router.get('/favorites', function(req, res, next) {
  // GET my favorite dogs. Might need an authentication middleware
})

router.post('/favorites', function(req, res, next) {
  // ADD a dog to my favorites. Might need an authentication middleware
})

module.exports = router;
