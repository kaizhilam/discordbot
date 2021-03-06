import { TextChannel } from 'discord.js';
import { IActionProps } from '..';

const DEFAULTCHANNEL = 'general';

export function sendMessageToChannel(props: IActionProps): void {
  const { guild, args } = props;
  const { message, channel } = args;
  const textChannel = guild.channels.cache.filter((c) => {
    return c.type === 'text';
  });

  let selectedChannel: TextChannel;
  if (channel) {
    selectedChannel = textChannel.find((c) => {
      return c.name === channel;
    }) as TextChannel;
  } else {
    selectedChannel = textChannel.find((c) => {
      return c.name === DEFAULTCHANNEL;
    }) as TextChannel;
  }

  selectedChannel?.send(message);
}
