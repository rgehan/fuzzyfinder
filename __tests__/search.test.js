import FuzzyFinder from '../fuzzyfinder';

let ff = new FuzzyFinder('<', '>');

test("'foo' should match ['foobar', 'barbaz', 'foobaz']", () => {
  expect(ff.search('foo', ['foobar', 'barbaz', 'foobaz'], false)).toBe(true);
});

test("'foo' should not match ['barbaz', 'bazbar']", () => {
  expect(ff.search('foo', ['barbaz', 'bazbar'], false)).toBe(false);
});

test("'foo' should not match []", () => {
  expect(ff.search('foo', [], false)).toBe(false);
});
