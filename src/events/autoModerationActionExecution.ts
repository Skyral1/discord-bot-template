import { Events } from 'discord.js';
import { handleAutoModerationAction } from '../services/automodService.js';

export const name = Events.AutoModerationActionExecution;

export async function execute(
  client: any,
  autoModerationActionExecution: any
) {
  await handleAutoModerationAction(client, autoModerationActionExecution);
}
