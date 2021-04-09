import { message } from '..';
import { actionManager } from '../../../actions';

jest.mock('../../../actions');

describe('message', () => {
  const mockOn = jest.fn();
  const bot = {
    on: mockOn,
  };

  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it("SHOULD be called with 'message' for bot.on", () => {
    const payloads = [];
    // @ts-ignore
    message({ bot, payloads });
    const mockOnFirstArg = mockOn.mock.calls[0][0];
    expect(mockOnFirstArg).toEqual('message');
  });

  it('SHOULD run action manager when message content matches with ignorecase', () => {
    const msg = {
      content: 'TeSt',
    };
    const payloads = [
      {
        event: 'message',
        args: {
          message: 'tEsT',
          ignoreCase: true,
        },
      },
    ];
    // @ts-ignore
    message({ bot, payloads });
    const mockOnSecondArg = mockOn.mock.calls[0][1];
    mockOnSecondArg(msg);
    expect(actionManager).toHaveBeenCalledTimes(1);
  });

  it('SHOULD NOT run action manager when message content does not match even with ignorecase', () => {
    const msg = {
      content: 'TeSt',
    };
    const payloads = [
      {
        event: 'message',
        args: {
          message: 'AsDf',
          ignoreCase: true,
        },
      },
    ];
    // @ts-ignore
    message({ bot, payloads });
    const mockOnSecondArg = mockOn.mock.calls[0][1];
    mockOnSecondArg(msg);
    expect(actionManager).toHaveBeenCalledTimes(0);
  });

  it('SHOULD run action manager when message content matches', () => {
    const msg = {
      content: 'test',
    };
    const payloads = [
      {
        event: 'message',
        args: {
          message: 'test',
        },
      },
    ];
    // @ts-ignore
    message({ bot, payloads });
    const mockOnSecondArg = mockOn.mock.calls[0][1];
    mockOnSecondArg(msg);
    expect(actionManager).toHaveBeenCalledTimes(1);
  });

  it('SHOULD NOT run action manager when message content does not match', () => {
    const msg = {
      content: 'test',
    };
    const payloads = [
      {
        event: 'message',
        args: {
          message: 'asdf',
        },
      },
    ];
    // @ts-ignore
    message({ bot, payloads });
    const mockOnSecondArg = mockOn.mock.calls[0][1];
    mockOnSecondArg(msg);
    expect(actionManager).toHaveBeenCalledTimes(0);
  });

  it('SHOULD run action Manager when channel matches', () => {
    const channel = {
      name: 'testChannel',
    };
    const msg = {
      content: 'asdf',
      channel: channel,
    };
    const guild = {
      channels: {
        cache: [channel],
      },
    };
    const payloads = [
      {
        event: 'message',
        args: {
          message: 'asdf',
          channel: 'testChannel',
        },
      },
    ];
    // @ts-ignore
    message({ bot, payloads, guild });
    const mockOnSecondArg = mockOn.mock.calls[0][1];
    mockOnSecondArg(msg);
    expect(actionManager).toHaveBeenCalledTimes(1);
  });

  it('SHOULD not run action Manager when channel does not match', () => {
    const msg = {
      content: 'asdf',
      channel: {
        name: 'fakeChannel',
      },
    };
    const guild = {
      channels: {
        cache: [
          {
            name: 'testChannel',
          },
        ],
      },
    };
    const payloads = [
      {
        event: 'message',
        args: {
          message: 'asdf',
          channel: 'testChannel',
        },
      },
    ];
    // @ts-ignore
    message({ bot, payloads, guild });
    const mockOnSecondArg = mockOn.mock.calls[0][1];
    mockOnSecondArg(msg);
    expect(actionManager).toHaveBeenCalledTimes(0);
  });

  it('SHOULD run action Manager when member matches', () => {
    const msg = {
      content: 'asdf',
      author: {
        tag: 'aaa#111',
      },
    };
    const payloads = [
      {
        event: 'message',
        args: {
          message: 'asdf',
          member: 'aaa#111',
        },
      },
    ];
    // @ts-ignore
    message({ bot, payloads });
    const mockOnSecondArg = mockOn.mock.calls[0][1];
    mockOnSecondArg(msg);
    expect(actionManager).toHaveBeenCalledTimes(1);
  });

  it('SHOULD not run action Manager when member does not match', () => {
    const msg = {
      content: 'asdf',
      author: {
        tag: 'aaa#111',
      },
    };
    const payloads = [
      {
        event: 'message',
        args: {
          message: 'asdf',
          member: 'bbb#222',
        },
      },
    ];
    // @ts-ignore
    message({ bot, payloads });
    const mockOnSecondArg = mockOn.mock.calls[0][1];
    mockOnSecondArg(msg);
    expect(actionManager).toHaveBeenCalledTimes(0);
  });
});
