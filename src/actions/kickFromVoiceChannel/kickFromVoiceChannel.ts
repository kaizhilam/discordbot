import { Collection, VoiceChannel } from 'discord.js';
import { IAction } from '../utils';

export function kickFromVoiceChannel(props: IAction): void {
  const { args, guild } = props;
  const { channel, member } = args;
  const voiceChannel = guild.channels.cache.filter((c) => c.type === 'voice') as Collection<string, VoiceChannel>;

  if (channel) {
    const selectedChannel = voiceChannel.find((c) => c.name === channel) as VoiceChannel;
    selectedChannel?.members.forEach((m) => {
      if (m.user.tag === member) {
        m.voice.kick();
      }
    });
  } else {
    voiceChannel.forEach((c) => {
      c.members.forEach((m) => {
        if (m.user.tag === member) {
          m.voice.kick();
        }
      });
    });
  }
}
