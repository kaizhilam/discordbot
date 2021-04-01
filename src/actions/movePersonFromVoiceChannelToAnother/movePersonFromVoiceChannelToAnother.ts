import { IActionProps } from '..';
import { Collection, VoiceChannel } from 'discord.js';

export function movePersonFromVoiceChannelToAnother(props: IActionProps): void {
  const { args, guild } = props;
  const { member } = args;

  const voiceChannel = guild.channels.cache.filter((c) => c.type === 'voice') as Collection<string, VoiceChannel>;

  const currentMemberVoiceChannel = voiceChannel?.find((c) => {
    return c.members.find((m) => m.user.tag === member);
  });

  const otherVoiceChannel = voiceChannel.filter((c) => c != currentMemberVoiceChannel);

  currentMemberVoiceChannel?.members.forEach((membersInChannel) => {
    if (membersInChannel.user.tag === member) {
      membersInChannel.voice.setChannel(otherVoiceChannel.random());
    }
  });
}
