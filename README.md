# Discord Bot Template

Template polyvalent de bot Discord en TypeScript, discord.js v14, Prisma, Redis et Docker.

## Démarrage local

```bash
npm ci
cp .env.example .env
npm run db:push
npm run dev
```

## Docker

```bash
cp .env.example .env
docker compose up -d --build
docker compose exec bot npx prisma migrate deploy
```

## Hébergeur tiers

Build : `npm ci && npm run build`  
Start : `npm start`  
Healthcheck : `/health`

Variables requises : `DISCORD_TOKEN`, `DISCORD_CLIENT_ID`, `DATABASE_URL`. Redis est optionnel via `REDIS_URL`.

## Fonctionnalités

- Slash commands modulaires
- Boutons, select menus et modals
- AutoMod et journalisation des actions Discord
- Commandes de modération
- Prisma / PostgreSQL
- Redis optionnel
- Docker Compose
- Compatible Railway, Render, Fly.io, Discloud et Pterodactyl
