import { sendToChannel } from '..';

describe('sendToChannel', () => {
  it('SHOULD', () => {
    const mockSend = jest.fn();
    const props = {
      message: {
        channel: {
          send: mockSend,
        },
      },
      args: {
        message: 'test',
      },
    };
    // @ts-ignore
    sendToChannel(props);
    expect(mockSend).toHaveBeenCalledWith(props.args.message);
  });
});
