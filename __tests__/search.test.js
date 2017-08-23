import FuzzyFinder from '../fuzzyfinder';

let ff = new FuzzyFinder('<', '>');

/*
 * Boolean behavior
 */

test("'foo' should match ['foobar', 'barbaz', 'foobaz']", () => {
  expect(ff.search('foo', ['foobar', 'barbaz', 'foobaz'], false)).toBe(true);
});

test("'foo' should not match ['barbaz', 'bazbar']", () => {
  expect(ff.search('foo', ['barbaz', 'bazbar'], false)).toBe(false);
});

test("'foo' should not match []", () => {
  expect(ff.search('foo', [], false)).toBe(false);
});

/*
 * Highlighting behavior
 */

test("'foo' should highlight ['foobar', 'barbaz', 'foobaz'] properly", () => {
  expect(ff.search('foo', ['foobar', 'barbaz', 'foobaz'])).toEqual([
    '<f><o><o>bar',
    '<f><o><o>baz',
 ]);
});

test("'foo' should not highlight anything from ['barbaz', 'bazbar']", () => {
  expect(ff.search('foo', ['barbaz', 'bazbar'])).toEqual([]);
});
