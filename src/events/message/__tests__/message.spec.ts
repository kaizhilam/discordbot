import { message } from '../message';

describe('message', () => {
  const mockOn = jest.fn();
  const bot = {
    on: mockOn,
  };

  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('SHOULD be called with message for bot', () => {
    const payloads = [];
    // @ts-ignore
    message({ bot, payloads });
    const mockOnFirstArg = mockOn.mock.calls[0][0];
    expect(mockOnFirstArg).toEqual('message');
  });
});
