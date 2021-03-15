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

bot.on('voiceStateUpdate', (oldVoiceState, newVoiceState) => {
  if (newVoiceState.channel) {
    console.log(`${newVoiceState.member.user.tag} joined ${newVoiceState.channel.name}`);
    if (newVoiceState.member.user.tag === 'User here') {
      newVoiceState.member.voice.kick();
    }
  } else if (oldVoiceState.channel) {
    console.log(`${oldVoiceState.member.user.tag} disconnected from ${oldVoiceState.channel.name}`);
  }
});
