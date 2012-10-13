# entschuldigen

entschuligen is a full time integration test. It tests whether an external
data source can be reliably synchronised with a Campaign Monitor subscriber
list. This is achieved by periodically performing subscribe, update, and
deactivate operations on a list, as well as acting as a webhook receiver
for these operations.

## Webhook setup

Webhooks are registered by POSTing to the Campaign Monitor API.

You'll need the following:

- Your Campaign Monitor API key (`api_key`)
- Your Campaign Monitor API list ID (`list_id`)
- The base URI of where you're running this app (`base_uri`)

These are the POST requests you'll want to make:

    $ curl -u "{api_key}:x" https://api.createsend.com/api/v3/lists/{list_id}/webhooks.json -X POST -d \
    '{ "Events": [ "Subscribe" ], "Url": "{base_uri}/receive/subscribe", "PayloadFormat": "json" }'

    $ curl -u "{api_key}:x" https://api.createsend.com/api/v3/lists/{list_id}/webhooks.json -X POST -d \
    '{ "Events": [ "Update" ], "Url": "{base_uri}/receive/update", "PayloadFormat": "json" }'

    $ curl -u "{api_key}:x" https://api.createsend.com/api/v3/lists/{list_id}/webhooks.json -X POST -d \
    '{ "Events": [ "Deactivate" ], "Url": "{base_uri}/receive/deactivate", "PayloadFormat": "json" }'

This sets up entschuldigen as the webhook receiver which will process
POST requests from Campaign Monitor for subscribe, update, and deactivate
events which occur on your list.

You can verify that you have set up webhooks correctly by doing:

    $ curl -u "{api_key}:x" https://api.createsend.com/api/v3/lists/{list_id}/webhooks.json?pretty=true

Which should give you something like:

    [
      {
        "WebhookID": "{subscribe_webhook_id}",
        "Events": [
          "Subscribe"
        ],
        "Url": "{base_uri}/receive/subscribe",
        "Status": "Active",
        "PayloadFormat": "Json"
      },
      {
        "WebhookID": "{update_webhook_id}",
        "Events": [
          "Update"
        ],
        "Url": "{base_uri}/receive/update",
        "Status": "Active",
        "PayloadFormat": "Json"
      },
      {
        "WebhookID": "{delete_webhook_id}",
        "Events": [
          "Deactivate"
        ],
        "Url": "{base_uri}/receive/deactivate",
        "Status": "Active",
        "PayloadFormat": "Json"
      }
    ]

## Application setup

Set the following environment variables:

- `CM_API_KEY` (your Campaign Monitor API key)
- `CM_LIST_ID` (your Campaign Monitor API list ID)

## What does this thing actually do?

entschuldigen periodically fires off subscribe, update, and deactivate
events on your list, by calling the Campaign Monitor API (job.js). We keep a
record of every event which is fired off in an event store.

At the same time, the entschuldigen listener (web.js) is listening for these
events using the webhooks you set up. When an event is heard, the listener
receives the event, and removes it from the event store.

TODO:
- Complete job.js so that it fires off more events, and so that it persists
a record of these events.
- Report on the state of the event store.
