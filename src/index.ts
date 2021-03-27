import { config as dotEnvConfig } from 'dotenv';
import { Client, Message } from 'discord.js';
import { voiceStateUpdate, message, ready } from './events';
import { IConfig } from './utils';

dotEnvConfig();

const TOKEN = process.env.TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const SCHEMA_CHANNEL_ID = process.env.SCHEMA_CHANNEL_ID;
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
      payloads = JSON.parse(msg.content);
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
      });
    }
  }
};

bot.on('message', startUp);
