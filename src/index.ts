import 'dotenv/config';
import express from 'express';
import { createBot } from './bot.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';

const app = express();

app.get('/', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.get('/health', (_req, res) => {
  res.send('ok');
});

const server = app.listen(env.PORT, () => {
  logger.info(`Serveur HTTP démarré sur le port ${env.PORT}`);
});

async function main() {
  const client = await createBot();

  const shutdown = async (signal: string) => {
    logger.info(`Arrêt demandé (${signal})`);
    server.close();
    await client.destroy();
    process.exit(0);
  };

  process.on('SIGTERM', () => void shutdown('SIGTERM'));
  process.on('SIGINT', () => void shutdown('SIGINT'));
}

main().catch(error => {
  logger.error(error, 'Échec du démarrage du bot');
  process.exit(1);
});
