import { sendToChannel } from '..';

describe('sendToChannel', () => {
  it('SHOULD send to general text channel', () => {
    const mockSend = jest.fn();
    const guild = {
      channels: {
        cache: [
          {
            type: 'text',
            name: 'general',
            send: mockSend,
          },
        ],
      },
    };
    const args = {
      message: 'test',
    };
    const props = {
      guild,
      args,
    };
    // @ts-ignore
    sendToChannel(props);
    expect(mockSend).toHaveBeenCalledWith(props.args.message);
  });

  it('SHOULD send to a specific text channel if channel is defined in args', () => {
    const mockSend = jest.fn();
    const guild = {
      channels: {
        cache: [
          {
            type: 'text',
            name: 'general',
            send: mockSend,
          },
          {
            type: 'text',
            name: 'testChannel',
            send: mockSend,
          },
        ],
      },
    };
    const args = {
      message: 'test',
      channel: 'testChannel',
    };
    const props = {
      guild,
      args,
    };
    // @ts-ignore
    sendToChannel(props);
    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith(props.args.message);
  });
});
