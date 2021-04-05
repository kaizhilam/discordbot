import { voiceStateUpdate } from '..';
import { voiceConnect, voiceDisconnect, mute, deafen } from '../..';
import { difference } from '../../../utils';

jest.mock('../..');
jest.mock('../../../utils');

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

  it('SHOULD run mute when event selfMute true', () => {
    difference.mockReturnValue({
      selfMute: true,
    });
    const oldVoiceState = {};
    const newVoiceState = {};
    const payloads = [];
    voiceStateUpdate({ bot, payloads });
    const mockOnSecondArg = mockOn.mock.calls[0][1];
    mockOnSecondArg(oldVoiceState, newVoiceState);
    expect(mute).toHaveBeenCalledTimes(1);
  });

  it('SHOULD run unmute when event selfMute is false', () => {
    // TODO: Change this when unmite functionality is up
    difference.mockReturnValue({
      selfMute: false,
    });
    const oldVoiceState = {};
    const newVoiceState = {};
    const payloads = [];
    voiceStateUpdate({ bot, payloads });
    const mockOnSecondArg = mockOn.mock.calls[0][1];
    mockOnSecondArg(oldVoiceState, newVoiceState);
    expect(mute).toHaveBeenCalledTimes(0);
  });

  it('SHOULD run deafen when event selfDeaf true', () => {
    difference.mockReturnValue({
      selfDeaf: true,
    });
    const oldVoiceState = {};
    const newVoiceState = {};
    const payloads = [];
    voiceStateUpdate({ bot, payloads });
    const mockOnSecondArg = mockOn.mock.calls[0][1];
    mockOnSecondArg(oldVoiceState, newVoiceState);
    expect(deafen).toHaveBeenCalledTimes(1);
  });

  it('SHOULD run undeafen when event selfDeaf false', () => {
    // TODO: Change this when undeafen functionality is up
    difference.mockReturnValue({
      selfDeaf: false,
    });
    const oldVoiceState = {};
    const newVoiceState = {};
    const payloads = [];
    voiceStateUpdate({ bot, payloads });
    const mockOnSecondArg = mockOn.mock.calls[0][1];
    mockOnSecondArg(oldVoiceState, newVoiceState);
    expect(deafen).toHaveBeenCalledTimes(0);
  });

  it('SHOULD run nothing when nothing exist', () => {
    difference.mockReturnValue({});
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
