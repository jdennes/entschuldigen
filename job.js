var restify = require('restify');

var db = restify.createJsonClient({ url: process.env.CLOUDANT_URL });

var api_key = process.env.CM_API_KEY;
var list_id = process.env.CM_LIST_ID;

var client = restify.createJsonClient({ url: 'https://api.createsend.com' });
client.basicAuth(api_key, 'x');

var now = Date.now();
var email = 'example.' + now + '@example.com';
var name = 'Example ' + now;

// Subscribe
client.post(
  '/api/v3/subscribers/' + list_id + '.json',
    { EmailAddress: email, Name: name, CustomFields: [], Resubscribe: true },
  function (err, req, res, obj) {
    console.log('Subscribed: %j', obj);

    // Add subscriber to local list
    db.put(
      '/subscribers/' + email,
      { state: "Active", name: name, email: email },
      function (err, req, res, obj) {
        console.log('Saved %s', email);
      }
    );

    // Log event
    var id = 'subscribe-' + email;
    db.put(
      '/events/' + id,
      { type: 'subscribe', email: obj, time: Date.now() },
      function (err, req, res, obj) {
        console.log("event store save result: %j", obj)
      }
    );
  }
);

// TODO: Fire off other events
