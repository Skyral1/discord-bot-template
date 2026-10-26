import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  GuildMember
} from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('timeout')
  .setDescription('Applique un timeout à un membre')
  .addUserOption(option =>
    option
      .setName('membre')
      .setDescription('Membre à sanctionner')
      .setRequired(true)
  )
  .addIntegerOption(option =>
    option
      .setName('duree')
      .setDescription('Durée en minutes')
      .setRequired(true)
      .setMinValue(1)
      .setMaxValue(40320)
  )
  .addStringOption(option =>
    option.setName('raison').setDescription('Motif de la sanction')
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers);

export async function execute(interaction: ChatInputCommandInteraction) {
  const member = interaction.options.getMember('membre');

  if (!(member instanceof GuildMember)) {
    return interaction.reply({
      content: 'Je ne peux pas appliquer un timeout à ce membre.',
      ephemeral: true
    });
  }

  const duration = interaction.options.getInteger('duree', true);
  const reason =
    interaction.options.getString('raison') ?? 'Aucune raison fournie';

  if (!member.moderatable) {
    return interaction.reply({
      content: 'Je ne peux pas appliquer un timeout à ce membre.',
      ephemeral: true
    });
  }

  await member.timeout(duration * 60_000, reason);

  return interaction.reply({
    content: `Timeout de ${duration} minute(s) appliqué à ${member.user.tag}.`,
    ephemeral: true
  });
}
