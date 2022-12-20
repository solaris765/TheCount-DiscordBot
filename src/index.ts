import { createNewClient } from "./client"

if (!process.env.TOKEN) {
  console.error("No token provided. Please set the TOKEN environment variable.")
  process.exit(1)
}
if (!process.env.CLIENT_ID) {
  console.error("No client ID provided. Please set the CLIENT_ID environment variable.")
  process.exit(1)
}

createNewClient()
// restart the bot on failure
process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error);
  createNewClient()
});