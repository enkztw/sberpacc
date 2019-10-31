var express = require('express');
var app = express();
var logger = require('morgan')

// An example middleware function
var a_middleware_function = function(req, res, next) {
  // ... perform some operations
  console.log('through mw')
  next(); // Call next() so Express will call the next middleware function in the chain.
}

// Function added with use() for all routes and verbs
// app.use(a_middleware_function);

// Function added with use() for a specific route
// app.use('/someroute', a_middleware_function);

// A middleware function added for a specific HTTP verb and route
// app.get('/', a_middleware_function);

app.listen(3000);

const json = {
  heh: 'mda',
  mda: 'heh'
}

app.use(logger('dev'))

app.all('/secret', function(req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});

app.get('/', function(req, res) {
  res.send('Hello Max!');
});

app.use('/about', a_middleware_function);
app.get('/about', function(req, res) {
  res.send(json);
});

app.listen(3001, function() {
  console.log('Example app listening on port 3001!');
});


// MAKE CONST NOT VAR