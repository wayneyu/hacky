var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080;

var routes = require('./api/routes/transactionRoute');

app.listen(port);
routes(app);

console.log('Hacky RESTful API server started on: ' + port);
