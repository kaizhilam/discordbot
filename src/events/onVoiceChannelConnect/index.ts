import { GuildMember } from 'discord.js';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function onVoiceChannelConnect(member: GuildMember) {
  console.log(member.user.tag);
}
