import { Collection, REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from "discord.js";
import {join} from "path";
import {readdirSync} from "fs";
import { SlashCommandDef } from "./types";
import { MyClient } from "../client";




async function registerCommands(commands: RESTPostAPIChatInputApplicationCommandsJSONBody[]) {
  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN!);

	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands },
    );

		console.log(`Successfully reloaded ${(data as any).length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
}

const commands = new Collection<String, SlashCommandDef>();

export async function loadCommands(client: MyClient) {
const commandsPath = join(__dirname);
console.log(`Loading commands from ${commandsPath}`)
const commandFiles = readdirSync(commandsPath)
  .filter((file: String) => !file.match(/index.*|types.*/) && file.match(/.*\.(t|j)s$/));

console.log(`Registering ${commandFiles.length} commands`)
for (const file of commandFiles) {
	const filePath = join(commandsPath, file);
	const command = (await import(filePath)).default;
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

await registerCommands(commands.map(command => command.data.toJSON()));
client.commands = commands;
}