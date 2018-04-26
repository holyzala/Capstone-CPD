const express = require('express');
const router = express.Router();

const UserController = require('./../controllers/UserController');
const SodaController = require('./../controllers/SodaController');
const HomeController = require('./../controllers/HomeController');

const custom = require('./../middleware/custom');

const passport = require('passport');
const path = require('path');


require('./../middleware/passport')(passport)
/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({status: "success", message: "Parcel Pending API", data: {"version_number": "v1.0.0"}})
});

router.post('/users', UserController.create);  // C
router.get('/users', passport.authenticate('jwt', {session: false}), UserController.get);  // R
router.put('/users', passport.authenticate('jwt', {session: false}), UserController.update);  // U
router.delete('/users', passport.authenticate('jwt', {session: false}), UserController.remove);  // D
router.post('/users/login', UserController.login);

router.post('/sodas', passport.authenticate('jwt', {session: false}), SodaController.create);  // C
router.get('/sodas', passport.authenticate('jwt', {session: false}), SodaController.getAll);  // R

router.get('/sodas/:soda_id', passport.authenticate('jwt', {session: false}), custom.soda, SodaController.get);  // R
router.put('/sodas/:soda_id', passport.authenticate('jwt', {session: false}), custom.soda,
    SodaController.update);  // U
router.delete('/sodas/:soda_id', passport.authenticate('jwt', {session: false}), custom.soda,
    SodaController.remove);  // D

router.get('/dash', passport.authenticate('jwt', {session: false}), HomeController.Dashboard);


//********* API DOCUMENTATION **********
router.use('/docs/api.json', express.static(path.join(__dirname, '/../public/v1/documentation/api.json')));
router.use('/docs', express.static(path.join(__dirname, '/../public/v1/documentation/dist')));
module.exports = router;
