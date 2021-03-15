import { GuildMember } from 'discord.js';
import { onVoiceChannelDisconnect } from '..';

const mockMember = {
  user: {
    tag: 'mockTag',
  },
} as GuildMember;

describe('onVoiceChannelDisconnect', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('SHOULD console log user tag', () => {
    const consoleLogSpy = jest.spyOn(global.console, 'log');
    onVoiceChannelDisconnect(mockMember);
    expect(consoleLogSpy).toHaveBeenCalledWith(mockMember.user.tag);
  });
});
