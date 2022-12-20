import { Guild } from "discord.js";

export function updatePopulation(guild: Guild) {
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