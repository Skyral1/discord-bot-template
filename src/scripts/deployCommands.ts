import { config } from 'dotenv';
import { registerCommands } from '../core/commandHandler.js';

config();

await registerCommands();
