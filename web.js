var restify = require('restify');

var db = process.env.CLOUDANT_URL;
var events = restify.createJsonClient({ url: db });

var server = restify.createServer({ name: 'entschuldigen' });
server.use(restify.bodyParser({ mapParams: false }));

server.get('/', function (req, res, next) { 
  res.send('entschuldigen is listening.') });

server.post('/receive/subscribe', function (req, res, next) {
  console.log('entschuldigen receiving subscribe:');
  console.log(req.body);

  // TODO: Find and remove event from event store

  res.send('entschuldigen heard you.')
  return next();
});

server.post('/receive/update', function (req, res, next) {
  console.log('entschuldigen receiving update:');
  console.log(req.body);

  // TODO: Find and remove event from event store

  res.send('entschuldigen heard you.')
  return next();
});

server.post('/receive/deactivate', function (req, res, next) {
  console.log('entschuldigen receiving deactivate:');
  console.log(req.body);

  // TODO: Find and remove event from event store

  res.send('entschuldigen heard you.')
  return next();
});

var port = process.env.PORT || 5000;
server.listen(parseInt(port), function() {
  console.log('Listening at %s', server.url);
});