import { Client, Events } from "discord.js"
const client = new Client({
  intents: [
    "Guilds",
    'GuildPresences',
    'GuildMembers'
  ]
})

client.on(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user?.tag}!`)

  for (const [id] of client.guilds.cache) {
    activeMembersCounter(client, id)
  }
})

function activeMembersCounter(c: Client, id:string) {
  const guild = c.guilds.cache.get(id);
  if (!guild) return;

  let active =0;
  let total = 0;
  guild.members.cache.each(m=>{
    if (!m.user.bot) {
      total++;
      if (m.presence?.status == "online")
        active++;
    }
  })
  const baseName = guild.name.split(' - Pop. ')[0]
  guild.setName(baseName + ` - Pop. ${active}/${total}`)
}


client.on("presenceUpdate", (o) => {
  if (o?.guild?.id)
    activeMembersCounter(client, o.guild.id)
})

client.login(process.env.TOKEN)
