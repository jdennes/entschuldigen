var restify = require('restify');

var db = process.env.CLOUDANT_URL;
var events = restify.createJsonClient({ url: db });

var api_key = process.env.CM_API_KEY;
var list_id = process.env.CM_LIST_ID;

var client = restify.createJsonClient({ url: 'https://api.createsend.com' });
client.basicAuth(api_key, 'x');

var email = 'example.' + Date.now() + '@example.com';

// Subscribe
client.post(
  '/api/v3/subscribers/' + list_id + '.json',
  { EmailAddress: email, Name: '', CustomFields: [], Resubscribe: true },
  function (err, req, res, obj) {
    console.log('Subscribed: %j', obj);

    events.put( // Save event
      '/events', { type: 'subscribe', email: obj, time: Date.now() },
      function (err, req, res, obj) {
        console.log("event store save result: %j", obj)
      }
    );
  }
);

// TODO: Fire off other events
