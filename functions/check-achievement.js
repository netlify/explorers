/*

HOW THIS WORKS

whenever the Hasura `activity` table gets a new entry (INSERT),
this function will get fired with a payload like this one:

    {
      "payload": {
        "event": {
          "session_variables": {
            "x-hasura-role": "admin"
          },
          "op": "MANUAL",
          "data": {
            "old": null,
            "new": {
              "app": "jamstack-explorers",
              "id": 113,
              "type": "video-complete",
              "event_data": {
                "path": "/learn/data-test-mission-1/data-test-stage-1",
                "videoId": "explorers/mjsas3k3ho0muunscsxn"
              },
              "user_id": "5a4dbf788198765bd5a127f2",
              "timestamp": "2020-11-11T00:25:13.465192+00:00"
            }
          },
          "trace_context": {
            "trace_id": 7784212484189668000,
            "span_id": 16444765363342199000
          }
        },
        "created_at": "2021-02-02T17:34:39.380619Z",
        "id": "72b02e15-494c-478b-9494-d09eb9cc79e8",
        "delivery_info": {
          "max_retries": 0,
          "current_retry": 0
        },
        "trigger": {
          "name": "jamstack-explorers-check-achievement"
        },
        "table": {
          "schema": "public",
          "name": "activity"
        }
      },
      "headers": [
        {
          "value": "application/json",
          "name": "Content-Type"
        },
        {
          "value": "hasura-graphql-engine/v1.3.3-cloud.3",
          "name": "User-Agent"
        }
      ],
      "version": "2"
    }

we need to check whether this new activity meets the criteria for
an achievement (in the case of explorers, we’re checking for a
complete mission, which is already done in
/src/pages/api/get-user-info.js)

if no condition is met, return 200 OK

if the condition is met, write to the `achievements` table in
Hasura with a new achievement:

See the achievement table in Hasura
 */

const fetch = require('node-fetch');

exports.handler = async (event) => {
  // if (payload.event.data.new.type !== 'video-complete') {
  //   return {
  //     statusCode: 200,
  //     body: 'ok',
  //   };
  // }

  // if we get here, we need to actually check

  const { payload } = JSON.parse(event.body);
  const { new: newActivity } = JSON.parse(payload.event.data);

  const postToAchievements = await fetch(process.env.HASURA_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'X-Hasura-Admin-Secret': process.env.HASURA_ADMIN_SECRET,
      'X-Hasura-Role': 'app',
    },
    body: JSON.stringify({
      query: `
        mutation MyMutation(
          $app: String!,
          $event_data: jsonb!,
          $type: String!,
          $user_id: String!,
        )
       {
          insert_achievements_one(object: {
            app: $app,
            event_data: $event_data,
            type: $type,
            user_id: $user_id
          }) {
            app
            event_data
            timestamp
            type
            user_id
          }
        }`,
      variables: {
        app: newActivity.app,
        event_data: {},
        type: 'mission-complete',
        user_id: newActivity.user_id,
      },
    }),
  }).then((res) => res.json());

  if (postToAchievements.errors) {
    console.log(postToAchievements.errors);
    return {
      statusCode: 500,
      body: 'ruh roh',
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
    },
    body: JSON.stringify(result.data.achievement),
  };
};
