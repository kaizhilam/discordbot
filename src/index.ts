import { config as dotEnvConfig } from 'dotenv';
import { Client } from 'discord.js';

dotEnvConfig();

const bot = new Client();
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', (msg) => {
  if (msg.content === 'ping') {
    msg.channel.send('pong');
  }
});
