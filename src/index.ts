import { config as dotEnvConfig } from 'dotenv';
import { Client } from 'discord.js';
import { onVoiceChannelConnect, onVoiceChannelDisconnect } from './events';

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

bot.on('voiceStateUpdate', (oldVoiceState, newVoiceState) => {
  if (newVoiceState.channel) {
    onVoiceChannelConnect(newVoiceState.member);
  } else if (oldVoiceState.channel) {
    onVoiceChannelDisconnect(newVoiceState.member);
  }
});
