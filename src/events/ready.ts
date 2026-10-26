import { Events } from 'discord.js';
import { logger } from '../utils/logger.js';

export const name = Events.ClientReady;
export const once = true;

export async function execute(client: any) {
  logger.info(`Connecté en tant que ${client.user?.tag}`);
  logger.info(`Présent sur ${client.guilds.cache.size} serveur(s)`);
}
