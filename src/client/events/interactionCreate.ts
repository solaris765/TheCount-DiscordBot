import { Events } from "discord.js";
import { MyClient } from "..";

export default function interactionCreate(client: MyClient) {
  console.log('Registering interactionCreate event')
  client.on(Events.InteractionCreate, async interaction => {
    console.log(`Received interaction ${interaction.type} from ${interaction.user.tag}`);
    if (!interaction.isChatInputCommand()) return;
    
    const command = client.commands.get(interaction.commandName);
  
    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }
  
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  });
}