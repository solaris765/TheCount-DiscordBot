import { Client, Events } from "discord.js"
import { updatePopulation } from "../../skills/update_population"

export default function ready(client: Client) {
  console.log('Registering ready event')
  client.on(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user?.tag}!`)
  
    client.guilds.cache.each((guild)=> {
      updatePopulation(guild)
    })
  })
}