const Soda = require('../models').Soda;

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    if(!body.name && !body.description){
        return ReE(res, 'A new soda requires a name and description.');
    }else{
        let err, soda;
        [err, soda] = await to(Soda.create(req.body));

        if(err) return ReE(res, err, 422);
        return ReS(res, {message:'Successfully created new soda.', soda:soda.toWeb()}, 201);
    }
};
module.exports.create = create;

const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let err, sodas;
    [err, sodas] = await to(Soda.find({}));

    let sodas_json = [];
    for (let i in sodas) {
        let soda = sodas[i];
        sodas_json.push(soda.toWeb())
    }
    return ReS(res, {sodas: sodas_json});
};
module.exports.getAll = getAll;

const get = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let soda = req.soda;
    return ReS(res, {soda: soda.toWeb()});
};
module.exports.get = get;

const update = async function (req, res) {
    let err, soda, data;
    soda = req.soda;
    data = req.body;
    if (data.reviews) {
        data.reviews = JSON.parse(data.reviews);
    }
    soda.set(data);

    [err, soda] = await to(soda.save());
    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {soda: soda.toWeb()});
};
module.exports.update = update;

const remove = async function (req, res) {
    let soda, err;
    soda = req.soda;

    [err, soda] = await to(soda.remove());
    if (err) return ReE(res, 'error occured trying to delete the company');

    return ReS(res, {message: 'Deleted Soda'}, 204);
};
module.exports.remove = remove;