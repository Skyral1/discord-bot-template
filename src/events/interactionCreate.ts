import { Events, Interaction, Client } from 'discord.js';
import { handleCommandInteraction } from '../core/commandHandler.js';

export const name = Events.InteractionCreate;

export async function execute(client: Client, interaction: Interaction) {
  await handleCommandInteraction(client, interaction);
}
