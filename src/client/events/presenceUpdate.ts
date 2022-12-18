import { Client, Presence, PresenceStatus } from "discord.js"
import { updatePopulation } from "../../skills/update_population"

export default function presenceUpdate(client: Client, oldPresence: Presence | null, newPresence: Presence) {
  console.log('Registering presenceUpdate event')
  client.on("presenceUpdate", (o: Presence) => {
    if (o?.guild?.id) {
      updatePopulation(client.guilds.cache.get(o.guild.id))
    }
  })
}