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
 */

const fetch = require('node-fetch');
exports.handler = async (event) => {
  const { payload } = JSON.parse(event.body);
  console.log(payload);
  /* Todo:
  1. Make token dynamic
  2. Fix relative path issue
  3. Figure out user-based achievement creation
  */

  const activity = payload.event.data.new;

  if (activity.type !== 'video-complete') {
    return {
      statusCode: 200,
      body: 'ok',
    };
  }
  // if we get here, we need to actually check if the user
  // has indeed completed a mission.

  // E.g: if completedMissions > 0, then we create a `mission-completed`
  // achievement for this user.

  // Get the users info using their token
  // const result = await fetchß('/api/get-user-info', {
  //   headers: {
  //     Authorization: `Bearer JkUgCOqwDGthsKIr1tewcCZfIkFcI9BKol4cWC39aDo`, // Temporarily hard coded the token
  //   },
  // }).then((response) => response.json());

  // get this users missions
  // const userMissions = result.activity.userMissions;
  // console.log(result.activity);

  // check if the user has completed any missions
  // const completedMissions = userMissions.filter((m) => m.progress === 1).length;

  // if (!completedMissions > 0) {
  //   return {
  //     statusCode: 200,
  //     body: 'ok',
  //   };
  // }

  // If the user has completed a mission, create an achievement for this user
  // based on how many missions they've completed. I will create the achievement for
  // completing "one" mission, however, we can create more with conditionals (or anyhow else)

  // if (completedMissions > 0 && completedMissions <= 1) {
  // create a `mission-complete` achievement in Hasura

  try {
    const response = await fetch(process.env.HASURA_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'X-Hasura-Admin-Secret': process.env.HASURA_ADMIN_SECRET,
      },
      body: JSON.stringify({
        operationName: 'MyMutation',
        query: `mutation MyMutation($app: String, $id: Int, $event_data: jsonb, $timestamp: timestamptz, $type: String, $user_id: String ) {
                insert_achievements_one(object: {app: $app, event_data: $event_data, type: $type, user_id: $user_id}) {
                  app
                  event_data
                  type
                  user_id
                }
        }`,
        variables: {
          app: `${activity.app}`,
          event_data: { mission: 'Nuxt' },
          type: 'mission-complete',
          user_id: `${activity.user_id}`,
        },
      }),
    });
    const value = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(value),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};

// return {
//   statusCode: 200,
//   body: 'ok',
// };
// };
