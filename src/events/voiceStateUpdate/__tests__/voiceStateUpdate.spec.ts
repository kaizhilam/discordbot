import { voiceStateUpdate } from '..';
import { voiceConnect, voiceDisconnect } from '../..';

jest.mock('../..');

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

  it('SHOULD run voiceConnect when newVoiceState.channel exist', () => {
    const oldVoiceState = {
      channel: '',
    };
    const newVoiceState = {
      channel: 'something',
    };
    const payloads = [];
    // @ts-ignore
    voiceStateUpdate({ bot, payloads });
    const mockOnSecondArg = mockOn.mock.calls[0][1];
    mockOnSecondArg(oldVoiceState, newVoiceState);
    expect(voiceConnect).toHaveBeenCalledTimes(1);
  });

  it('SHOULD run voiceDisconnect when oldVoiceState.channel exist', () => {
    const oldVoiceState = {
      channel: 'something',
    };
    const newVoiceState = {
      channel: '',
    };
    const payloads = [];
    // @ts-ignore
    voiceStateUpdate({ bot, payloads });
    const mockOnSecondArg = mockOn.mock.calls[0][1];
    mockOnSecondArg(oldVoiceState, newVoiceState);
    expect(voiceDisconnect).toHaveBeenCalledTimes(1);
  });

  it('SHOULD run nothing when nothing exist', () => {
    const oldVoiceState = {
      channel: '',
    };
    const newVoiceState = {
      channel: '',
    };
    const payloads = [];
    // @ts-ignore
    voiceStateUpdate({ bot, payloads });
    const mockOnSecondArg = mockOn.mock.calls[0][1];
    mockOnSecondArg(oldVoiceState, newVoiceState);
    expect(voiceDisconnect).toHaveBeenCalledTimes(0);
    expect(voiceConnect).toHaveBeenCalledTimes(0);
  });
});
