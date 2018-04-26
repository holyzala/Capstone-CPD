const Soda = require('../models/soda');

let soda = async function (req, res, next) {
    let soda_id, err, soda;
    soda_id = req.params.soda_id;

    [err, soda] = await to(Soda.findOne({_id: soda_id}));
    if (err) return ReE(res, "err finding soda");

    if (!soda) return ReE(res, "Soda not found with id: " + soda_id);

    req.soda = soda;
    next();
};
module.exports.soda = soda;