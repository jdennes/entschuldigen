var express = require('express');

var app = express.createServer(express.logger());
app.use(express.bodyParser());

app.get('/', function(req, res) {
  res.send("entschuldigen is a webhook receiver.");
});

app.post('/receive/subscribe', function(req, res) {
  console.log('entschuldigen receiving subscribe:');
  console.log(req.body);

  // TODO: Find and remove event from event store  

  res.send('entschuldigen!');
});

app.post('/receive/update', function(req, res) {
  console.log('entschuldigen receiving update:');
  console.log(req.body);

  // TODO: Find and remove event from event store  

  res.send('entschuldigen!');
});

app.post('/receive/deactivate', function(req, res) {
  console.log('entschuldigen receiving deactivate:');
  console.log(req.body);

  // TODO: Find and remove event from event store  

  res.send('entschuldigen!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});