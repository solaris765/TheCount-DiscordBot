import { Client, Collection, GatewayIntentBits } from "discord.js";
import { loadCommands } from "../commands";
import { SlashCommandDef } from "../commands/types";
import { registerEvents } from "./events";

export type MyClient = Client & {
  commands?: Collection<String, SlashCommandDef>
}

let client: MyClient
export async function createNewClient() {
  if (client) {
    client.destroy()
  }
  console.log('Creating new client')
  client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildMembers,
    ]
  })

  console.log('Loading commands')
  await loadCommands(client)

  console.log('Registering events')
  await registerEvents(client)

  console.log('Logging in bot')
  client.login(process.env.TOKEN)
  return client
}

export function getClient() {
  return client
}
