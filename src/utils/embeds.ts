import { EmbedBuilder } from 'discord.js';

export function successEmbed(message: string) {
  return new EmbedBuilder()
    .setColor(0x57f287)
    .setDescription(message);
}

export function errorEmbed(message: string) {
  return new EmbedBuilder()
    .setColor(0xed4245)
    .setDescription(message);
}

export function infoEmbed(title: string, description: string) {
  return new EmbedBuilder()
    .setColor(0x5865f2)
    .setTitle(title)
    .setDescription(description);
}
