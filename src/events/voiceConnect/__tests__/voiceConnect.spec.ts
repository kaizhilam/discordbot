import { voiceConnect } from '..';
import { actionManager } from '../../../actions';
import { Guild, VoiceState } from 'discord.js';
import { IPayload, IConfig } from '../../../utils';

jest.mock('../../../actions');

describe('voiceConnect', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('SHOULD call action manager if member matches', () => {
    const guild = {} as Guild;
    const config = {} as IConfig;
    const voiceState = {
      member: {
        user: {
          tag: 'test',
        },
      },
    } as VoiceState;
    const payloads = [
      {
        event: 'voiceConnect',
        args: {
          member: 'test',
        },
        actions: [],
      },
    ] as IPayload[];
    voiceConnect({ payloads, voiceState, config, guild });
    expect(actionManager).toHaveBeenCalledWith({ actions: [], config, guild, event: payloads[0] });
  });

  it('SHOULD do nothing if member does not match', () => {
    const guild = {} as Guild;
    const config = {} as IConfig;
    const voiceState = {
      member: {
        user: {
          tag: 'not test',
        },
      },
    } as VoiceState;
    const payloads = [
      {
        event: 'voiceConnect',
        args: {
          member: 'test',
        },
        actions: [],
      },
    ] as IPayload[];
    voiceConnect({ payloads, voiceState, config, guild });
    expect(actionManager).toHaveBeenCalledTimes(0);
  });
});
