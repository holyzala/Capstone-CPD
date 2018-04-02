var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    req.collection.find({}, {}, function (e, docs) {
        res.render('index', {
            sodalist: docs
        });
    });
});

router.get('/addsoda/', function (req, res, next) {
    res.render('addsoda');
});

router.post('/addsoda/', function (req, res, next) {
    var ret = req.collection.insert({name: req.body.sodaname, description: req.body.sodadesc, ratings: []});
    ret.then(function(result) {
        if (req.body.done) {
            res.redirect('/');
        } else {
            res.redirect('/addsoda');
        }
    }).catch(function (error) {
        console.log(error.toString());
    });
});

router.get('/addrating/', function (req, res, next) {
    req.collection.find({}, {}, function (e, docs) {
        res.render('addrating', {
            sodalist: docs
        });
    });
});

router.post('/addrating/', function (req, res, next) {
    console.log(req.body.soda + " " + req.body.username + " " + req.body.rating);
    req.collection.findOne({name: req.body.soda}).then(function(doc) {
        if (doc.ratings) {
            doc.ratings.push({user: req.body.username, rating: req.body.rating});
        } else {
            doc.ratings = [{user: req.body.username, rating: req.body.rating}];
        }
        var ret = req.collection.update({name: doc.name}, doc);
        ret.then(function (result) {
            if (req.body.done) {
                res.redirect('/');
            } else {
                res.redirect('/addrating');
            }
        }).catch(function(error) {
            console.log(error.toString());
        });
    });
});

module.exports = router;
