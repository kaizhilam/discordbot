import { config as dotEnvConfig } from 'dotenv';
import { Client } from 'discord.js';

dotEnvConfig();

const bot = new Client();
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

// bot.on('ready', () => {
//   console.info(`Logged in as ${bot.user.tag}!`);
// });

import fs from 'fs';
import { message } from './events/message/message';
import { voiceStateUpdate } from './events';

const rawdata = fs.readFileSync('payload.json', 'utf8');
const externalPayload = JSON.parse(rawdata);

message({ bot, payloads: externalPayload });
voiceStateUpdate({ bot, payloads: externalPayload });
