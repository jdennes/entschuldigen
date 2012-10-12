# entschuldigen

Use webhooks to keep an external data source synchronised with a
Campaign Monitor subscriber list.

## Webhook setup

Webhooks are registered by POSTing to the Campaign Monitor API.

You'll need the following:

- Your Campaign Monitor API key (`api_key`)
- Your Campaign Monitor API list ID (`list_id`)
- The base URI of where you're running this app (`base_uri`)

This is the POST request you'll want to make:

    $ curl -u "{api_key}:x" https://api.createsend.com/api/v3/lists/{list_id}/webhooks.json -X POST -d \
    '{ "Events": [ "Subscribe", "Update", "Deactivate" ], "Url": "{base_uri}/hook", "PayloadFormat": "json" }'

This sets up entschuldigen as the webhook receiver which will process
subscribe, update, and deactivate events which occur on your list.
