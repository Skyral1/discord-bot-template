import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  TextChannel
} from 'discord.js';
import { logger } from '../utils/logger.js';

export async function handleAutoModerationAction(
  client: any,
  action: any
) {
  const guild = client.guilds.cache.get(action.guildId);
  if (!guild) return;

  logger.warn(
    {
      guildId: action.guildId,
      userId: action.userId,
      ruleId: action.ruleId,
      content: action.content
    },
    'Action AutoMod déclenchée'
  );

  const logChannelId = (guild.settings as any)?.modLogChannelId;
  if (!logChannelId) return;

  const channel = guild.channels.cache.get(logChannelId) as TextChannel | undefined;
  if (!channel?.isTextBased()) return;

  const embed = new EmbedBuilder()
    .setTitle('AutoMod — Action appliquée')
    .setColor(0xed4245)
    .addFields(
      { name: 'Utilisateur', value: `<@${action.userId}>`, inline: true },
      { name: 'Règle', value: action.ruleId ?? 'Inconnue', inline: true },
      { name: 'Canal', value: `<#${action.channelId}>`, inline: true },
      { name: 'Contenu', value: action.content?.slice(0, 1000) || 'Aucun contenu' }
    )
    .setTimestamp();

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`automod:timeout:${action.userId}`)
      .setLabel('Timeout 10 min')
      .setStyle(ButtonStyle.Danger)
  );

  await channel.send({ embeds: [embed], components: [row] });
}
