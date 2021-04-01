import { playAudioFromYouTube } from '..';
import ytdl from 'discord-ytdl-core';

jest.mock('discord-ytdl-core');

describe('playAudioFromYouTube', () => {
  it('SHOULD play music', () => {
    const mockOn = jest.fn();
    const mockPlay = jest.fn();
    const mockJoin = jest.fn();
    mockOn.mockImplementation((arg1, arg2) => arg2());
    mockJoin.mockResolvedValue({
      play: mockPlay,
    });
    mockPlay.mockReturnValue({
      on: mockOn,
    });
    const mockLeave = jest.fn();
    const props = {
      guild: {
        channels: {
          cache: [
            {
              name: 'channel',
              join: mockJoin,
              leave: mockLeave,
            },
          ],
        },
      },
      args: {
        channel: 'channel',
        url: 'url',
      },
    };
    // @ts-ignore
    playAudioFromYouTube(props);
    expect(ytdl.mock.calls[0][0]).toEqual(props.args.url);
  });
});
