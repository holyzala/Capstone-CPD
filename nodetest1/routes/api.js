var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    let resList = {'sodas': {'link': '/api/sodas', 'verbs': ['GET']}};
    res.status(200).send(resList)
});

router.get('/sodas/', function (req, res, next) {
    req.collection.find({}, {}, function (e, docs) {
        res.status(200).send(docs);
    });
});

module.exports = router;
