var express = require('express');

var app = express.createServer(express.logger());
app.use(express.bodyParser());

app.get('/', function(req, res) {
  res.send("entschuldigen is a webhook receiver.");
});

app.post('/hook', function(req, res) {
  // req.body will take the form:
  // { ListID: {list_id},
  //   Events:
  //    [ { Type: {'Subscribe' | 'Update' | 'Deactivate'},
  //        Date: '2012-10-13 03:07:00',
  //        EmailAddress: 'example@example.com',
  //        Name: 'Example',
  //        CustomFields: [],
  //        SignupIPAddress: '8.8.8.8' } ] }
  console.log('entschuldigen receiving:');
  console.log('--------------------');
  console.log(req.body);
  console.log('--------------------');
  res.send('entschuldigen!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});