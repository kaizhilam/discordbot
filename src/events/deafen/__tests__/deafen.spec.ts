import { deafen } from '..';
import { actionManager } from '../../../actions';

jest.mock('../../../actions');

describe('deafen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });
  it('SHOULD call action manager when event is deafen', () => {
    const props = {
      voiceState: {},
      payloads: [
        {
          event: 'deafen',
        },
      ],
      config: {},
      guild: {},
    };
    deafen(props);
    expect(actionManager).toHaveBeenCalledTimes(1);
  });
  it('SHOULD call action manager member matches', () => {
    const props = {
      voiceState: {
        member: {
          user: {
            tag: 'aaa111',
          },
        },
      },
      payloads: [
        {
          event: 'deafen',
          args: {
            member: 'aaa111',
          },
        },
      ],
      config: {},
      guild: {},
    };
    deafen(props);
    expect(actionManager).toHaveBeenCalledTimes(1);
  });
  it('SHOULD not call action manager member does not matches', () => {
    const props = {
      voiceState: {
        member: {
          user: {
            tag: 'bbb222',
          },
        },
      },
      payloads: [
        {
          event: 'deafen',
          args: {
            member: 'aaa111',
          },
        },
      ],
      config: {},
      guild: {},
    };
    deafen(props);
    expect(actionManager).toHaveBeenCalledTimes(0);
  });
});
