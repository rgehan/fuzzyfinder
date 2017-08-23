import FuzzyFinder from '../fuzzyfinder';

let ff = new FuzzyFinder('<', '>');

/*
 * Basic behavior (without array elements & getter)
 */

test("'' does not match 'foobar'", () => {
  expect(ff.match('', 'foobar')).toBe(false);
});

test("'foo' does not match ''", () => {
  expect(ff.match('foo', '')).toBe(false);
});

test("'abc' does not match 'foobar'", () => {
  expect(ff.match('abc', 'foobar')).toBe(false);
});

test("'foo' matches 'foobarbaz'", () => {
  expect(ff.match('foo', 'foobarbaz')).toMatchObject({
    text: 'foobarbaz'
  });
});

test("'fbb' matches 'foobarbaz'", () => {
  expect(ff.match('fbb', 'foobarbaz')).toMatchObject({
    text: 'foobarbaz'
  });
});

test("'baz' matches 'foobarbaz'", () => {
  expect(ff.match('baz', 'foobarbaz')).toMatchObject({
    text: 'foobarbaz'
  });
});

/*
 * Basic behavior with outputFull option
 */
test("Should not output subject", () => {
  let results = ff.match('baaa', { product: 'Banana', price: 1.23 }, {
    getter: obj => obj.product,
    outputFull: false,
  });

  expect(results).not.toHaveProperty('subject');

  expect(results).toMatchObject({
    text: 'Banana',
  });
});

test("Should output subject", () => {
  expect(ff.match('baaa', { product: 'Banana', price: 1.23 }, {
    getter: obj => obj.product,
    outputFull: true,
  })).toMatchObject({
    text: 'Banana',
    subject: {
      product: 'Banana',
      price: 1.23,
    },
  });
});

/*
 * Basic behavior (with array elements & getter)
 */

test("'foo' matches array ['foobar', 'baz']", () => {
  expect(ff.match('foo', ['foobar', 'baz'], {
    getter: arr => arr[0],
  })).toMatchObject({
    text: 'foobar',
  });
});

test("'baaa' matches object { product: 'Banana', price: 1.23 }", () => {
  expect(ff.match('baaa', { product: 'Banana', price: 1.23 }, {
    getter: obj => obj.product,
  })).toMatchObject({
    text: 'Banana',
  });
});

/*
 * Highlighting behavior
 */

test("'bar' highlights 'foobarbaz' properly", () => {
  expect(ff.match('bar', 'foobarbaz', {
    highlight: true,
  })).toMatchObject({
    text: 'foo<b><a><r>baz',
  });
});

test("'fbb' highlights 'foobarbaz' properly", () => {
  expect(ff.match('fbb', 'foobarbaz', {
    highlight: true,
  })).toMatchObject({
    text: '<f>oo<b>ar<b>az',
  });
});
