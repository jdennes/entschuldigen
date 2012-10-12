var restify = require('restify');

var api_key = process.env.CM_API_KEY;
var list_id = process.env.CM_LIST_ID;

var client = restify.createJsonClient({ url: 'https://api.createsend.com' });
client.basicAuth(api_key, 'x');

var email = 'example.' + Date.now() + '@example.com';

// Subscribe
client.post(
  '/api/v3/subscribers/' + list_id + '.json',
  { EmailAddress: email, Name: '', CustomFields: [], Resubscribe: true },
  function(err, req, res, obj) {

    // TODO: Save event in event store

    console.log('%d -> %j', res.statusCode, res.headers);
    console.log('Subscribed: %j', obj);
});

// TODO: Fire off other events
