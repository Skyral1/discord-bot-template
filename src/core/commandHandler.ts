import { Client, Collection, Events, REST, Routes } from 'discord.js';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { env } from '../config/env.js';
import { logger } from '../utils/logger.js';
import type { Command } from '../types/command.js';

export async function loadCommands(client: Client) {
  client.commands = new Collection<string, Command>();
  const basePath = path.join(process.cwd(), 'dist', 'commands');

  async function walk(directory: string) {
    const entries = await readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }

      if (!entry.name.endsWith('.js')) continue;

      const module = await import(`file://${fullPath}`);
      const command: Command = module.default ?? module;

      if (!command?.data || !command?.execute) continue;

      client.commands!.set(command.data.name, command);
      logger.debug(`Commande chargée : /${command.data.name}`);
    }
  }

  await walk(basePath);
  logger.info(`${client.commands.size} commande(s) chargée(s)`);
}

export async function registerCommands() {
  const rest = new REST().setToken(env.DISCORD_TOKEN);
  const commands: unknown[] = [];
  const basePath = path.join(process.cwd(), 'dist', 'commands');

  async function walk(directory: string) {
    const entries = await readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }

      if (!entry.name.endsWith('.js')) continue;

      const module = await import(`file://${fullPath}`);
      const command = module.default ?? module;

      if (command?.data) commands.push(command.data.toJSON());
    }
  }

  await walk(basePath);

  await rest.put(
    Routes.applicationCommands(env.DISCORD_CLIENT_ID),
    { body: commands }
  );

  logger.info(`${commands.length} commande(s) enregistrée(s) sur Discord`);
}

export async function handleCommandInteraction(client: Client, interaction: any) {
  if (!interaction.isChatInputCommand()) return;

  const command = (client.commands as Collection<string, Command>)?.get(
    interaction.commandName
  );

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    logger.error(error, `Erreur dans /${interaction.commandName}`);

    const payload = {
      content: 'Une erreur est survenue lors de l’exécution de la commande.',
      ephemeral: true
    };

    if (interaction.deferred || interaction.replied) {
      await interaction.followUp(payload);
    } else {
      await interaction.reply(payload);
    }
  }
}

export type { Command };
export const commandEvent = Events.InteractionCreate;
