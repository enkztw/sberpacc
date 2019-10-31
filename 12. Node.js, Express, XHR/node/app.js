var express = require('express');
var app = express();

const json = {
  heh: 'mda',
  mda: 'heh'
}

app.all('/secret', function(req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});

app.get('/', function(req, res) {
  res.send('Hello Max!');
});

app.get('/about', function(req, res) {
  res.send(json);
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});


// MAKE CONST NOT VAR