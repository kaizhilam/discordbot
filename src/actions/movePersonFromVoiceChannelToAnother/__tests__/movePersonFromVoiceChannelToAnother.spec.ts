import { Guild } from 'discord.js';
import { movePersonFromVoiceChannelToAnother } from '..';

describe('movePersonFromVoiceChannelToAnother', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('SHOULD move person to a random channel', () => {
    const guild = ({
      channels: {
        cache: [
          {
            type: 'voice',
            members: [
              {
                user: {
                  tag: 'aaa111',
                },
                voice: {
                  setChannel: jest.fn(),
                },
              },
              {
                user: {
                  tag: 'bbb222',
                },
              },
            ],
          },
          {
            type: 'voice',
          },
        ],
      },
    } as unknown) as Guild;
    const props = {
      args: {
        member: 'aaa111',
      },
      guild,
    };
    //@ts-ignore
    const randomMock = jest.fn();
    randomMock.mockImplementation(() => 'aaa');
    Array.prototype.random = randomMock;
    movePersonFromVoiceChannelToAnother(props);
    expect(randomMock).toHaveBeenCalledTimes(1);
  });
});
