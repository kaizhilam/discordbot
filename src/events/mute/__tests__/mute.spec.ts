import { mute } from '..';
import { actionManager } from '../../../actions';

jest.mock('../../../actions');

describe('mute', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });
  it('SHOULD call action manager when member matches', () => {
    const voiceState = {
      member: {
        user: {
          tag: 'aaa#111',
        },
      },
    };
    const payloads = [
      {
        event: 'mute',
        args: {
          member: 'aaa#111',
        },
      },
    ];
    mute({ voiceState, payloads });
    expect(actionManager).toHaveBeenCalledTimes(1);
  });
  it('SHOULD call action manager when member does not match', () => {
    const voiceState = {
      member: {
        user: {
          tag: 'aaa#111',
        },
      },
    };
    const payloads = [
      {
        event: 'mute',
        args: {
          member: 'not a match',
        },
      },
    ];
    mute({ voiceState, payloads });
    expect(actionManager).toHaveBeenCalledTimes(0);
  });
});
