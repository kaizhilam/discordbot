import { sendToChannel, kickFromVoiceChannel } from '..';
import { actionManager } from '../actionManager';

jest.mock('..');

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

  it('SHOULD call sendToChannel when event is sendToChannel', () => {
    const props = {
      actions: [
        {
          action: 'sendToChannel',
        },
      ],
    };
    // @ts-ignore
    actionManager(props);
    expect(sendToChannel).toHaveBeenCalledTimes(1);
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
});
