import { config as dotEnvConfig } from 'dotenv';
import { Client } from 'discord.js';
import { voiceStateUpdate, message, ready } from './events';
import { IConfig } from './utils';
import * as express from 'express';

dotEnvConfig();

const TOKEN = process.env.TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const SCHEMA_HOST = process.env.SCHEMA_HOST;
const PORT = process.env.PORT;
const config = {
  token: TOKEN,
  guildId: GUILD_ID,
} as IConfig;

const bot = new Client();
bot.login(TOKEN);

const app = express();
app.use(express.json());
app.post('/', (req, res) => {
  const payloads = req.body;
  bot.removeAllListeners();
  bot.guilds.fetch(GUILD_ID).then((guild) => {
    ready({ bot, payloads, config, guild });
    message({ bot, payloads, config, guild });
    voiceStateUpdate({ bot, payloads, config, guild });
  });
  res.sendStatus(200);
});
app.listen(PORT, () => {
  console.log(`Listening at ${SCHEMA_HOST}:${PORT}`);
});
