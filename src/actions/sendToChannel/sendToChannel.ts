import { Message } from 'discord.js';
import { IActionArg } from '../../utils';

interface ISendToChannel {
  message: Message;
  args: IActionArg;
}

export function sendToChannel(props: ISendToChannel): void {
  const { message, args } = props;
  message.channel.send(args.message);
}
