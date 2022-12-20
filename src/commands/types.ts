import type { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"

export type SlashCommand = Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
export type ExecuteChatInputCommandInteraction = (interaction: ChatInputCommandInteraction) => Promise<void> | void
export interface SlashCommandDef {data: SlashCommand, execute: ExecuteChatInputCommandInteraction}