var doorsRepo = require('../repository/doorsRepo');



module.exports = {
    index: findAll,
    show: findById,
    update: updateById,
};

function findAll(req, res) {
    doorsRepo.get().then(function(data){
        res.status(200);
        res.json({data: data});
    }).catch(function(err){
        res.status(500);
        res.json({error: {status: 500, msg: "door info not available."}});
    });
}

function findById(req, res) {
    doorsRepo.get().then(function(data){
        res.status(200);
        res.json({data: data[req.params.id]});
    }).catch(function(err){
        res.status(500);
        res.json({error: {status: 500, msg: "door info not available."}});
    });
}

function updateById(req, res){
    var status = req.body.data.status;
    var doorId = req.params.id;
    var update = {};
    update[doorId] = status;
    doorsRepo.add(update)
    doorsRepo.sync().then(function(data){
        res.status(200);
        res.json({data: data[doorId]});
    }).catch(function(err){
        res.status(500);
        res.json({error: {status: 500, msg: "door status can not be updated at this time."}});
    });

}