import { Client } from "discord.js";
import { createNewClient } from "..";

export default function disconnect(client: Client) {
  console.log('Registering disconnect event');
  client.on('disconnect', function(erMsg: string, code: number) {
    console.log('----- Bot disconnected from Discord with code', code, 'for reason:', erMsg, '-----');
    createNewClient();
  });
}