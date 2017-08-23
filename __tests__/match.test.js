import FuzzyFinder from '../fuzzyfinder';

let ff = new FuzzyFinder('<', '>');

/*
 * Boolean behavior
 */

test("'' does not match 'foobar'", () => {
  expect(ff.match('', 'foobar', false)).toBe(false);
});

test("'foo' does not match ''", () => {
  expect(ff.match('foo', '', false)).toBe(false);
});

test("'abc' does not match 'foobar'", () => {
  expect(ff.match('abc', 'foobar', false)).toBe(false);
});

test("'foo' matches 'foobarbaz'", () => {
  expect(ff.match('foo', 'foobarbaz', false)).toMatchObject({ text: 'foobarbaz' });
});

test("'fbb' matches 'foobarbaz'", () => {
  expect(ff.match('fbb', 'foobarbaz', false)).toMatchObject({ text: 'foobarbaz' });
});

test("'baz' matches 'foobarbaz'", () => {
  expect(ff.match('baz', 'foobarbaz', false)).toMatchObject({ text: 'foobarbaz' });
});

/*
 * Highlighting behavior
 */

test("'bar' highlights 'foobarbaz' properly", () => {
  expect(ff.match('bar', 'foobarbaz').text).toBe('foo<b><a><r>baz');
});

test("'fbb' highlights 'foobarbaz' properly", () => {
  expect(ff.match('fbb', 'foobarbaz').text).toBe('<f>oo<b>ar<b>az');
});
