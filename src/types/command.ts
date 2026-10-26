import { Client, Collection } from 'discord.js';
import {
  SlashCommandBuilder,
  ChatInputCommandInteraction
} from 'discord.js';

export type Command = {
  data: SlashCommandBuilder | any;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
};

declare module 'discord.js' {
  interface Client {
    commands?: Collection<string, Command>;
  }
}
