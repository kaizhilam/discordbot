import {
  kickFromVoiceChannel,
  movePersonFromVoiceChannelToAnother,
  playAudioFromYouTube,
  sendMessageToChannel,
} from '../..';
import { actionManager } from '..';

jest.mock('../..');

describe('actionManager', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('SHOULD console log when there is an invalid action', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const props = {
      actions: [
        {
          action: 'invalid',
        },
      ],
    };
    // @ts-ignore
    actionManager(props);
    expect(consoleSpy).toHaveBeenCalledWith('Invalid Action');
  });

  it('SHOULD call kickFromVoiceChannel when event is kickFromVoiceChannel', () => {
    const props = {
      actions: [
        {
          action: 'kickFromVoiceChannel',
        },
      ],
    };
    // @ts-ignore
    actionManager(props);
    expect(kickFromVoiceChannel).toHaveBeenCalledTimes(1);
  });

  it('SHOULD call movePersonFromVoiceChannelToAnother when event is movePersonFromVoiceChannelToAnother', () => {
    const props = {
      actions: [
        {
          action: 'movePersonFromVoiceChannelToAnother',
        },
      ],
    };
    // @ts-ignore
    actionManager(props);
    expect(movePersonFromVoiceChannelToAnother).toHaveBeenCalledTimes(1);
  });

  it('SHOULD call playAudioFromYouTube when event is playAudioFromYouTube', () => {
    const props = {
      actions: [
        {
          action: 'playAudioFromYouTube',
        },
      ],
    };
    // @ts-ignore
    actionManager(props);
    expect(playAudioFromYouTube).toHaveBeenCalledTimes(1);
  });

  it('SHOULD call sendMessageToChannel when event is sendMessageToChannel', () => {
    const props = {
      actions: [
        {
          action: 'sendMessageToChannel',
        },
      ],
    };
    // @ts-ignore
    actionManager(props);
    expect(sendMessageToChannel).toHaveBeenCalledTimes(1);
  });
});
