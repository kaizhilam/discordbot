import { playAudioFromYouTube } from '..';
import ytdl from 'discord-ytdl-core';
import 'regenerator-runtime/runtime';

jest.mock('discord-ytdl-core');

describe('playAudioFromYouTube', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('SHOULD play audio', () => {
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
      event: {
        args: {
          member: 'aaa',
        },
      },
    };
    playAudioFromYouTube(props);
    expect(ytdl.mock.calls[0][0]).toEqual(props.args.url);
  });

  it('SHOULD play on start time when start time is given', () => {
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
        start: 10,
        url: 'url',
      },
      event: {
        args: {
          member: 'aaa',
        },
      },
    };
    // @ts-ignore
    playAudioFromYouTube(props);
    expect(ytdl.mock.calls[0][1]['seek']).toEqual(props.args.start);
  });

  it('SHOULD stop audio when a stop time is given', async () => {
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
        stop: 5,
      },
      event: {
        args: {
          member: 'aaa',
        },
      },
    };
    jest.useFakeTimers();
    await playAudioFromYouTube(props);
    expect(setTimeout.mock.calls[0][1]).toEqual(5000);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    mockLeave.mockReset();
    setTimeout.mock.calls[0][0]();
    expect(mockLeave).toHaveBeenCalledTimes(1);
  });

  it('SHOULD join the channel the user if in and play the audio', () => {
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
              type: 'voice',
              members: [
                {
                  user: {
                    tag: 'testMember',
                  },
                },
              ],
            },
          ],
        },
      },
      args: {
        url: 'url',
      },
      event: {
        args: {
          member: 'testMember',
        },
      },
    };
    playAudioFromYouTube(props);
    expect(ytdl).toHaveBeenCalledTimes(1);
  });

  it('SHOULD do nothing if stop time is greater than start time', () => {
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
        start: 10,
        url: 'url',
        stop: 5,
      },
      event: {
        args: {
          member: 'aaa',
        },
      },
    };
    playAudioFromYouTube(props);
    expect(ytdl).toHaveBeenCalledTimes(0);
  });
});
