var mongo = require('mongodb');

var seeds = require('../db/seeds');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('tododb', server, {w: 1});
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'tododb' database");
        db.collection('todos', {strict:true}, function(err, collection) {
            if (err) {
                console.log("Sample todos collection doesn't exist. Seeding.");
                seeds.populate(db);
            }
        });
    }
});
 
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Find: ' + id);
    db.collection('todos', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, todo) {
            res.send(todo);
        });
    });
};
 
exports.findAll = function(req, res) {
    db.collection('todos', function(err, collection) {
        collection.find().toArray(function(err, todos) {
            res.send(todos);
        });
    });
};
 
exports.addItem = function(req, res) {
    var todo = req.body;
    console.log('Add: ' + JSON.stringify(todo));

    db.collection('todos', function(err, collection) {
        collection.insert(todo, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
 
exports.updateItem = function(req, res) {
    var id = req.params.id;
    var todo = req.body;
    console.log('Update: ' + id);
    console.log(JSON.stringify(todo));

    db.collection('todos', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, todo, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating todo: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(todo);
            }
        });
    });
}
 
exports.deleteItem = function(req, res) {
    var id = req.params.id;
    console.log('Delete: ' + id);

    db.collection('todos', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}
