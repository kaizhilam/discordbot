import { config as dotEnvConfig } from 'dotenv';
import { Client } from 'discord.js';

dotEnvConfig();

const bot = new Client();
const TOKEN = process.env.TOKEN;
const BOT_TEXT_CHANNEL_ID = process.env.BOT_TEXT_CHANNEL_ID;
const config = {
  token: TOKEN,
  textChannelId: BOT_TEXT_CHANNEL_ID,
};

bot.login(TOKEN);

// bot.on('ready', () => {
//   console.info(`Logged in as ${bot.user.tag}!`);
// });

import fs from 'fs';
import { message } from './events/message/message';
import { voiceStateUpdate } from './events';
import { ready } from './events/ready/ready';

const rawdata = fs.readFileSync('payload.json', 'utf8');
const externalPayload = JSON.parse(rawdata);

message({ bot, payloads: externalPayload, config });
voiceStateUpdate({ bot, payloads: externalPayload, config });
ready({ bot, payloads: externalPayload, config });
