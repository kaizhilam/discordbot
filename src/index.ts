import { config as dotEnvConfig } from 'dotenv';
import { Client, Message } from 'discord.js';
import { voiceStateUpdate, message, ready } from './events';
import { IConfig, Environment } from './utils';
import { readFileSync } from 'fs';

dotEnvConfig();

const TOKEN = process.env.TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const SCHEMA_CHANNEL_ID = process.env.SCHEMA_CHANNEL_ID;
const ENVIRONMENT = process.env.ENVIRONMENT;
const config = {
  token: TOKEN,
  guildId: GUILD_ID,
  schemaChannelId: SCHEMA_CHANNEL_ID,
} as IConfig;

const bot = new Client();
bot.login(TOKEN);

const startUp = (msg: Message) => {
  if (msg.channel.id === config.schemaChannelId && msg.author.id !== bot.user.id) {
    let payloads;
    try {
      if (ENVIRONMENT === Environment.DEVELOPMENT) {
        const test = readFileSync('test.json', 'utf-8');
        payloads = JSON.parse(test);
      } else {
        payloads = JSON.parse(msg.content);
      }
      msg.reply('Done');
    } catch (e) {
      msg.reply('Not valid JSON');
    }
    if (payloads) {
      bot.removeAllListeners();
      bot.on('message', startUp);
      bot.guilds.fetch(GUILD_ID).then((guild) => {
        ready({ bot, payloads, config, guild });
        message({ bot, payloads, config, guild });
        voiceStateUpdate({ bot, payloads, config, guild });
        console.log('Bot instantiated');
      });
      // const guild = bot.guilds.cache.get(GUILD_ID);
      // ready({ bot, payloads, config, guild });
      // message({ bot, payloads, config, guild });
      // voiceStateUpdate({ bot, payloads, config, guild });
      // console.log('Bot instantiated');
    }
  }
};
bot.on('ready', () => {
  console.log('Bot is ready, type anything in schema chat to instantiate the bot');
});
bot.on('message', startUp);
