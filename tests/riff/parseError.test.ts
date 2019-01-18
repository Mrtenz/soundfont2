import { ParseError } from '../../src/riff';

describe('ParseError', () => {
  it('should have a message without expected and received result', () => {
    const error = new ParseError('foo');
    expect(error.message).toBe('foo');
  });

  it('should have a message with expected and received result', () => {
    const error = new ParseError('foo', 'bar', 'baz');
    expect(error.message).toBe('foo, expected bar, received baz');
  });
});
