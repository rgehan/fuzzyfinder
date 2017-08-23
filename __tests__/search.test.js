import FuzzyFinder from '../fuzzyfinder';

let ff = new FuzzyFinder('<', '>');

/*
 * Basic behavior
 */

test("'foo' should match ['foobar', 'barbaz', 'foobaz']", () => {
  expect(ff.search('foo', ['foobar', 'barbaz', 'foobaz'])).toMatchObject([
    { text: 'foobar' },
    { text: 'foobaz' },
  ]);
});

test("'foo' should not match ['barbaz', 'bazbar']", () => {
  expect(ff.search('foo', ['barbaz', 'bazbar'])).toEqual([]);
});

test("'foo' should not match []", () => {
  expect(ff.search('foo', [])).toEqual([]);
});

/*
 * Complex behavior:
 * - Object search subject & getter
 * - Full output
 */

test("'baaa' should match [{ product: 'Banana', price: 1.23 }, { product: 'Meat', price: 10.67 }]", () => {
  expect(ff.search('baaa', [
    { product: 'Banana', price: 1.23 },
    { product: 'Meat', price: 10.67 }
  ], {
    highlight: false,
    outputFull: true,
    getter: obj => obj.product,
  })).toMatchObject([{
    text: 'Banana',
    subject: {
      product: 'Banana',
      price: 1.23,
    },
  }]);
});

/*
 * Complex behavior:
 * - Object search subject & getter
 * - Full output
 * - Highlighting
 */

test("'baaa' should match & highlight [{ product: 'Banana', price: 1.23 }, { product: 'Meat', price: 10.67 }]", () => {
  expect(ff.search('baaa', [
    { product: 'Banana', price: 1.23 },
    { product: 'Meat', price: 10.67 }
  ], {
    highlight: true,
    outputFull: true,
    getter: obj => obj.product,
  })).toMatchObject([{
    text: '<B><a>n<a>n<a>',
    subject: {
      product: 'Banana',
      price: 1.23,
    },
  }]);
});
