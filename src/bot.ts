import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { loadCommands } from './core/commandHandler.js';
import { loadEvents } from './core/eventHandler.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';

export async function createBot() {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildModeration
    ],
    partials: [Partials.Message, Partials.Channel, Partials.GuildMember]
  });

  await loadCommands(client);
  await loadEvents(client);

  await client.login(env.DISCORD_TOKEN);
  logger.info('Bot connecté à Discord');

  return client;
}
