var restify = require('restify');

var db = restify.createJsonClient({ url: process.env.CLOUDANT_URL });

var server = restify.createServer({ name: 'entschuldigen' });
server.use(restify.bodyParser({ mapParams: false }));

server.get('/', function (req, res, next) { res.send("i'm listening..."); });
server.get('/events', function (req, res, next) {
  db.get('/events/_all_docs_', function (rq, rs, data) {
    console.log(data);
    //res.send(data);
  });
});
server.get('/subscribers', function (req, res, next) {
  db.get('/subscribers/_all_docs_', function (rq, rs, data) {
    console.log(data);
    //res.send(data);
  });
});

server.post('/receive/subscribe', function (req, res, next) {
  console.log('entschuldigen receiving subscribe:');
  console.log(req.body);
  var event_id = 'subscribe-' + req.body.Events[0].EmailAddress;
  // Delete from events to indicate that event was heard
  db.del(
    '/events/' + event_id,
    function (err, req, res) {
      console.log('Deleted: %s', event_id);
    }
  );
  res.send('entschuldigen heard you.');
  return next();
});

server.post('/receive/update', function (req, res, next) {
  console.log('entschuldigen receiving update:');
  console.log(req.body);
  // TODO: Delete from events to indicate that event was heard
  res.send('entschuldigen heard you.');
  return next();
});

server.post('/receive/deactivate', function (req, res, next) {
  console.log('entschuldigen receiving deactivate:');
  console.log(req.body);
  // TODO: Delete from events to indicate that event was heard
  res.send('entschuldigen heard you.');
  return next();
});

var port = process.env.PORT || 5000;
server.listen(parseInt(port), function() {
  console.log("i'm listening at %s", server.url);
});