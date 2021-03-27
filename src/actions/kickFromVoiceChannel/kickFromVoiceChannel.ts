import { GuildMember } from 'discord.js';
import { IActionArg } from '../../utils';

interface IKickFromVoiceChannel {
  args: IActionArg;
  member: GuildMember;
}

export function kickFromVoiceChannel(props: IKickFromVoiceChannel): void {
  const { args, member } = props;
  if (member.user.tag === args.member) {
    member.voice.kick();
  }
}
