import { voiceStateUpdate } from '..';
import { actionManager } from '../../../actions';

jest.mock('../../../actions');

describe('voiceStateUpdate', () => {
  const mockOn = jest.fn();
  const bot = {
    on: mockOn,
  };

  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it("SHOULD be called with 'voiceStateUpdate' for bot.on", () => {
    const payloads = [];
    // @ts-ignore
    voiceStateUpdate({ bot, payloads });
    const mockOnFirstArg = mockOn.mock.calls[0][0];
    expect(mockOnFirstArg).toEqual('voiceStateUpdate');
  });

  describe('newVoiceState', () => {
    const newVoiceState = {
      channel: {},
      member: {
        user: {
          tag: 'test',
        },
      },
    };

    it('SHOULD run action manager when newVoiceState is triggered', () => {
      const payloads = [
        {
          event: 'onVoiceChannelConnect',
          args: {
            member: 'test',
          },
        },
      ];
      // @ts-ignore
      voiceStateUpdate({ bot, payloads });
      const mockOnSecondArg = mockOn.mock.calls[0][1];
      mockOnSecondArg({}, newVoiceState);
      expect(actionManager).toHaveBeenCalledTimes(1);
    });

    it('SHOULD not call actionManager if member does not match', () => {
      const payloads = [
        {
          event: 'onVoiceChannelConnect',
          args: {
            member: 'does not match',
          },
        },
      ];
      // @ts-ignore
      voiceStateUpdate({ bot, payloads });
      const mockOnSecondArg = mockOn.mock.calls[0][1];
      mockOnSecondArg({}, newVoiceState);
      expect(actionManager).toHaveBeenCalledTimes(0);
    });

    it('SHOULD not call newVoiceState when nothing is changing', () => {
      // @ts-ignore
      voiceStateUpdate({ bot, payloads: [] });
      const mockOnSecondArg = mockOn.mock.calls[0][1];
      mockOnSecondArg({}, {});
      expect(actionManager).toHaveBeenCalledTimes(0);
    });
  });

  describe('oldVoiceState', () => {
    const oldVoiceState = {
      channel: {},
      member: {
        user: {
          tag: 'test',
        },
      },
    };

    it('SHOULD run action manager when oldVoiceState is triggered', () => {
      const payloads = [
        {
          event: 'onVoiceChannelDisconnect',
          args: {
            member: 'test',
          },
        },
      ];
      // @ts-ignore
      voiceStateUpdate({ bot, payloads });
      const mockOnSecondArg = mockOn.mock.calls[0][1];
      mockOnSecondArg(oldVoiceState, {});
      expect(actionManager).toHaveBeenCalledTimes(1);
    });

    it('SHOULD not call actionManager if member does not match', () => {
      const payloads = [
        {
          event: 'onVoiceChannelDisconnect',
          args: {
            member: 'does not match',
          },
        },
      ];
      // @ts-ignore
      voiceStateUpdate({ bot, payloads });
      const mockOnSecondArg = mockOn.mock.calls[0][1];
      mockOnSecondArg(oldVoiceState, {});
      expect(actionManager).toHaveBeenCalledTimes(0);
    });

    it('SHOULD not call oldVoiceState when nothing is changing', () => {
      // @ts-ignore
      voiceStateUpdate({ bot, payloads: [] });
      const mockOnSecondArg = mockOn.mock.calls[0][1];
      mockOnSecondArg({}, {});
      expect(actionManager).toHaveBeenCalledTimes(0);
    });
  });
});
