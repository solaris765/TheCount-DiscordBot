# The Count - Discord Bot
Counts active/totals users in a Discord server and updates the server population count in a server name.  

Delimeter `" - Pop. "` is used to separate the server name from the population count.

## Commands
* `/count to {0 - 100}` - Helps the user count to a number between 0 and 100.

## Adding this bot to your server:
[Click Here](https://discord.com/api/oauth2/authorize?client_id=1017626703587184700&permissions=1056&scope=bot%20applications.commands)

## Self Hosting
Two environement variables must be passed to the application.
`TOKEN`: The Token from your Bot page on the Discord dev portal
`CLIENT_ID`: The Client Id from the OAuth2-> General page on the discord dev portal

### Scopes
* bot
* application.commands

### Bot Permissins:
* Manage Server
* Read Messages/View Channels
