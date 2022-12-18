import {setTimeout} from 'node:timers/promises';
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";


export default {
  data: new SlashCommandBuilder()
    .setName('count')
    .setDescription('Helps you count')
    .addNumberOption(option =>
      option.setName('to')
        .setDescription('The number to count to')
        .setRequired(true)
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const to = interaction.options.getNumber('to');
    if (to === null) {
      await interaction.reply('You must provide a number to count to');
      return;
    }
    if (to < 1) {
      await interaction.reply('I can only count to numbers greater than 0');
      return;
    }
    if (to > 100) {
      await interaction.reply('I can only count to 100');
      return;
    }
    let msg = '1 ';
    interaction.reply(msg);
    for (let i = 2; i <= to; i++) {
      msg += i + ' ';
      await setTimeout(500);
      await interaction.editReply(msg);
    }
  },
};
