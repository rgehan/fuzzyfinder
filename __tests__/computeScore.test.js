import FuzzyFinder from '../fuzzyfinder';

let ff = new FuzzyFinder();

test("<f><o><o>barbaz should score 6", () => {
  expect(ff.computeScore('foobarbaz', [1, 2, 3])).toBe(6);
});

test("<f><o><o>bar<b><a>z should score 6004", () => {
  expect(ff.computeScore('foobarbaz', [1, 2, 3, 6, 7])).toBe(6004);
});

test("foobarbaz should score 9", () => {
  expect(ff.computeScore('foobarbaz', [])).toBe(9);
});
