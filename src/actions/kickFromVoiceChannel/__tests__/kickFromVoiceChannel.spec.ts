import { kickFromVoiceChannel } from '..';
import { Guild } from 'discord.js';

describe('kickFromVoiceChannel', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('SHOULD kick a specific member from all voice channel', () => {
    const mockKickFn = jest.fn();
    const mockArgs = {
      member: 'test',
    };
    const mockGuild = ({
      channels: {
        cache: [
          {
            type: 'voice',
            name: 'General',
            members: [
              {
                user: {
                  tag: 'test',
                },
                voice: {
                  kick: mockKickFn,
                },
              },
              {
                user: {
                  tag: 'do not kick',
                },
                voice: {
                  kick: mockKickFn,
                },
              },
            ],
          },
        ],
      },
    } as unknown) as Guild;
    const props = {
      args: mockArgs,
      guild: mockGuild,
    };
    kickFromVoiceChannel(props);
    expect(mockKickFn).toHaveBeenCalledTimes(1);
  });

  it('SHOULD kick  a specific member from specific voice channel if channel is defined', () => {
    const mockKickFn = jest.fn();
    const mockArgs = {
      member: 'test',
      channel: 'General',
    };
    const mockGuild = ({
      channels: {
        cache: [
          {
            type: 'voice',
            name: 'General',
            members: [
              {
                user: {
                  tag: 'test',
                },
                voice: {
                  kick: mockKickFn,
                },
              },
              {
                user: {
                  tag: 'do not kick',
                },
                voice: {
                  kick: mockKickFn,
                },
              },
            ],
          },
          {
            type: 'voice',
            name: 'Do not kick channel',
            members: [
              {
                user: {
                  tag: 'test',
                },
                voice: {
                  kick: mockKickFn,
                },
              },
            ],
          },
        ],
      },
    } as unknown) as Guild;
    const props = {
      args: mockArgs,
      guild: mockGuild,
    };
    kickFromVoiceChannel(props);
    expect(mockKickFn).toHaveBeenCalledTimes(1);
  });
});
