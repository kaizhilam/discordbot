import { GuildMember } from 'discord.js';
import { onVoiceChannelConnect } from '..';

const mockMember = {
  user: {
    tag: 'mockTag',
  },
} as GuildMember;

describe('onVoiceChannelConnect', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('SHOULD console log user tag', () => {
    const consoleLogSpy = jest.spyOn(global.console, 'log');
    onVoiceChannelConnect(mockMember);
    expect(consoleLogSpy).toHaveBeenCalledWith(mockMember.user.tag);
  });
});
