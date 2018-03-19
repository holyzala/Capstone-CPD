var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var db = req.db;
    var collection = db.get('sodacollection');
    collection.find({}, {}, function (e, docs) {
        res.render('index', {
            sodalist: docs
        });
    });
});

router.get('/addsoda/', function (req, res, next) {
    res.render('addsoda');
});

router.post('/addsoda/', function (req, res, next) {
    var db = req.db;
    var collection = db.get('sodacollection');
    var ret = collection.insert({name: req.body.sodaname, description: req.body.sodadesc});
    ret.catch(function(error) {
        console.log(error.toString());
    });
    if (req.body.done) {
        res.redirect('/');
    } else {
        res.redirect('/addsoda');
    }
});

module.exports = router;
