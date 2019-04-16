## Slack Standup Bot

:construction: This is currently a WIP :construction:

This bot picks a random member of the team to run standup each day of the week and posts the selection to a designated team channel. It is setup to run in [google app scripts](https://script.google.com) and uses a google sheet as a pseudo database.

The google sheet should contain a single column with each of the team members slack id's e.g.

| fname1.lname1 |
| fname2.lname2 |
| fname3.lname3 |

In order to develop locally clone this repository and `npm install`

In order to run properly the following Script Properties need to be specified in google apps script properties:

 - `SLACK_INCOMING_URL` The url for a slack incoming webhook.
 - `SPREADSHEET_ID` The id of the google sheet holding all the team members names
 - `SLACK_CHANNEL_NAME` The name of the channel to publish message to

The script can be setup programattically by running `createTriggers`. Or individual triggers can be created as needed using the app scripts GUI.

--------------------

### Proposed Future Features

 - Setup Tests so that this isn't so hacky :bowtie:
 - Add support to filter team members based on their calendars
 - Only run if there is a standup in the team calendar for the next day


