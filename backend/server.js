var express = require('express');
var bodyParser = require('body-parser');
var morgan  = require('morgan');

var item = require('./routes/todos');

 
var app = express();

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

app.use(bodyParser.json());
app.use(morgan({format: 'dev', immediate: true}));

 
app.get('/todos', item.findAll);
app.get('/todos/:id', item.findById);
app.post('/todos', item.addItem);
app.put('/todos/:id', item.updateItem);
app.delete('/todos/:id', item.deleteItem);
 
app.listen(3333);
console.log('Listening on port 3333.');