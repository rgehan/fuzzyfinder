import FuzzyFinder from '../fuzzyfinder';

let ff = new FuzzyFinder();

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
