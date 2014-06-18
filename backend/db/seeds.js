exports.populate = function(db) { 
    var todos = [{
        text: "Take out the trash", 
        done: false
    },
    {
        text: "Buy milk", 
        done: false
    }];
 
    db.collection('todos', function(err, collection) {
        collection.insert(todos, {safe: true}, function(err, result) {});
    });
};
