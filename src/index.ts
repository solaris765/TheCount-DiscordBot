import { createNewClient } from "./client"

createNewClient()


// restart the bot on failure
process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error);
  createNewClient()
});