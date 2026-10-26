import { Events, Interaction } from 'discord.js';
import { Client } from 'discord.js';
import { handleCommandInteraction } from './commandHandler.js';

export const name = Events.InteractionCreate;

export async function execute(client: Client, interaction: Interaction) {
  await handleCommandInteraction(client, interaction);
}
