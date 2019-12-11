var express = require('express');

var router = express.Router();

var mongoose = require('mongoose');
var Player = mongoose.model('Player');

router.param('id', function(req, res, next, id) {
  var query = Player.findById(id);
  query.exec(function (err, item){
    if (err) { return next(err); }
    if (!item) { return next(new Error("can't find item")); }
    req.item = item;
    return next();
  });
});

router.get('/player/:name', function(req, res, next) {
    console.log("in get Team");
    var query = {teamName: req.params.name};
    Player.find(query, (function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result);
    }));
});

router.post('/player', function(req, res, next) {
    console.log("in add player");
    console.log(req.body);
    var player = new Player(req.body);
    player.save(function(err, item){
    if(err){ return next(err); }
    console.log(item);
    res.json(item);
  });
});

router.delete('/player/:id', function(req, res) {
   console.log("in delete player");
   req.item.remove();
   res.send(200);
});




module.exports = router;