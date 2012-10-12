var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(req, res) {
  res.send("entschuldigen is a webhook receiver.");
});

app.post('/hook', function(req, res) {
  console.log('entshuldigen receiving:');
  console.log('--------------------');
  console.log(req.body);
  console.log('--------------------');
  res.send('entschuldigen!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});