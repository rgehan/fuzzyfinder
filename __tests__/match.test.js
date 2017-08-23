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

test("'abc' matches 'abcdefg'", () => {
  expect(ff.match('abc', 'abcdefg', false)).toBe(true);
});

test("'abc' matches 'abecedaire'", () => {
  expect(ff.match('abc', 'abecedaire', false)).toBe(true);
});

test("'abc' matches 'foobarabc'", () => {
  expect(ff.match('abc', 'foobarabc', false)).toBe(true);
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
