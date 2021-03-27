import { ready } from '..';
import { actionManager } from '../../../actions';

jest.mock('../../../actions');

describe('ready', () => {
  const mockOn = jest.fn();
  const bot = {
    on: mockOn,
  };

  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it("SHOULD be called with 'ready' for bot.on", () => {
    const payloads = [];
    // @ts-ignore
    ready({ bot, payloads });
    const mockOnFirstArg = mockOn.mock.calls[0][0];
    expect(mockOnFirstArg).toEqual('ready');
  });

  it('SHOULD run ready event', () => {
    const payloads = [
      {
        event: 'ready',
      },
      {
        event: 'test',
      },
    ];
    // @ts-ignore
    ready({ payloads, bot });
    const mockOnSecondArg = mockOn.mock.calls[0][1];
    mockOnSecondArg();
    expect(actionManager).toHaveBeenCalledTimes(1);
  });
});
