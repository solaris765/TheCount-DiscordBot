import {readdirSync} from 'fs'
import { join } from 'path';
import { MyClient } from '..';

export async function registerEvents(client: MyClient) {
  // load all events from the events folder
  const eventsPath = join(__dirname);
  console.log(`Loading events from ${eventsPath}`)
  const events = readdirSync(__dirname)
    .filter(file => !file.startsWith('index') && file.match(/.*\.(t|j)s$/));

  console.log(`Registering ${events.length} events`)
  // loop through the events and register them
  for (const file of events) {
    const filePath = join(eventsPath, file);
    const event = await import(filePath)
    event.default(client);    
  }
}