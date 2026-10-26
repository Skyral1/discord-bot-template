import { Client } from 'discord.js';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { logger } from '../utils/logger.js';

type EventModule = {
  name: string;
  once?: boolean;
  execute: (...args: any[]) => void | Promise<void>;
};

export async function loadEvents(client: Client) {
  const eventsPath = path.join(process.cwd(), 'dist', 'events');
  const entries = await readdir(eventsPath, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.name.endsWith('.js')) continue;

    const module = await import(`file://${path.join(eventsPath, entry.name)}`);
    const event: EventModule = module.default ?? module;

    if (!event?.name || !event?.execute) continue;

    if (event.once) {
      client.once(event.name as any, (...args) => event.execute(client, ...args));
    } else {
      client.on(event.name as any, (...args) => event.execute(client, ...args));
    }

    logger.debug(`Événement chargé : ${event.name}`);
  }
}
