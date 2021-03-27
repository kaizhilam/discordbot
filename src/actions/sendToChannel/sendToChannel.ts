import { Client, Message, TextChannel } from 'discord.js';
import { IActionArg, IConfig } from '../../utils';

interface ISendToChannel {
  bot?: Client;
  message?: Message;
  args: IActionArg;
  config: IConfig;
}

export function sendToChannel(props: ISendToChannel): void {
  const { bot, message, args, config } = props;
  if (message) {
    message.channel.send(args.message);
  } else if (bot) {
    const channel = bot.channels.cache.get(config.textChannelId) as TextChannel;
    channel.send(args.message);
  }
}
