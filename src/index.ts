import { config as dotEnvConfig } from 'dotenv';
import { Client } from 'discord.js';
import fs from 'fs';
import { voiceStateUpdate, message, ready } from './events';
import { IConfig } from './utils';

dotEnvConfig();

const bot = new Client();
const TOKEN = process.env.TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const config = {
  token: TOKEN,
  guildId: GUILD_ID,
} as IConfig;

bot.login(TOKEN);

const rawdata = fs.readFileSync('payload.json', 'utf8');
const externalPayload = JSON.parse(rawdata);

bot.guilds.fetch(GUILD_ID).then((guild) => {
  ready({ bot, payloads: externalPayload, config, guild });
  message({ bot, payloads: externalPayload, config, guild });
  voiceStateUpdate({ bot, payloads: externalPayload, config, guild });
});
