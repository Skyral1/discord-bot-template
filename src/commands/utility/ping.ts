import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Affiche la latence du bot');

export async function execute(interaction: ChatInputCommandInteraction) {
  const sent = await interaction.reply({
    content: 'Calcul de la latence…',
    fetchReply: true
  });

  const latency = sent.createdTimestamp - interaction.createdTimestamp;

  await interaction.editReply(
    `Pong ! Latence API : ${latency} ms — WebSocket : ${Math.round(interaction.client.ws.ping)} ms`
  );
}
