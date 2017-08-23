# [fuzzyfinder](https://github.com/rgehan/fuzzyfinder)

This is a tiny fuzzyfinder-like search engine.
There is an [example react app](https://github.com/rgehan/fuzzyfinder-example-app) demonstrating the module.

## Installation
```bash
$ npm install fuzzyfinder # or yarn install fuzzyfinder
```

## Usage
```javascript
// Import the module
import fuzzyfinder from 'fuzzyfinder';

// Create an instance
const ff = new fuzzyfinder('<b>', '</b>');

// Test data
const data = [
  'absolute', 'absolutely', 'absorb', 'abuse', 'academic', 'accept',
  'access', 'accident', 'accompany', 'accomplish', 'according',
  'account', 'accurate', 'accuse', 'achieve', 'achievement',
  // ...
];

// Perform a search
let results = ff.search('abs', data);

// -> ['<b>a</b><b>b</b><b>s</b>olute', '<b>a</b><b>b</b><b>s</b>olutely', ... ]
```

## API

### Methods configuration
A configuration object can be passed to both `search` and `match` methods:
```javascript
{
  highlight: false, // Generate the highlighted subject ?
  outputFull: true, // Output the whole subject ?
  getter: obj => obj.name, // The getter method allowing to extract the string from the subject
}
```

#### `{ highlight: true, ... }`
Enables the highlighting on the output.
Only the `text` field will be applied, the `subject` object, if passed, will be passed unaltered.

#### `{ outputFull: true, getter: obj => obj.name, ... }`
If `outputFull` is set to `true`, output the matched `subject` too.
If the search array isn't an array of string but an array of random objects, it is necessary to provide a getter method allowing to extract the searched string from the object:

For example:
```javascript
let data = [{ product: 'Banana', price: 1.23 }, { product: 'Meat', price: 10.67 }];

ff.search('baaa', data, {
  outputFull: true,
  getter: obj => obj.product,
});

/* Outputs:
 * [{
 *   score: 123,
 *   text: 'Banana',
 *   subject: {
 *     product: 'Banana',
 *     price: 1.23
 *   }
 * }]
 */

 ff.search('baaa', data, {
   outputFull: false,
   getter: obj => obj.product,
 });

 /* Outputs:
  * [{
  *   score: 123,
  *   text: 'Banana'
  * }]
  */
```

### Performing a search on a list of values
```javascript
search(needle, haystack, options = {});
```
It is probably the most useful method of the class, it searches the dataset and return the matches.

`haystack` can be an array of string, or an array of objects.
If it is an array of objects, the `getter` method has to be set to allow the engine to know on what field of the object to search.


### Finding out whether a string matches another
```javascript
match(search, string, options = {});
```
It is the method used by `search`. It returns `false` if there is no match, or a `match object` if there is a match.

```javascript
ff.match('foo', 'foobar'); // -> { text: 'foobar', score: 123 }
ff.match('baz', 'foobar'); // -> false
ff.match('foo', 'foobar', { highlight: true }); // -> { text: '<f><o><o>bar', score: 123 }
ff.match('baz', 'foobar', { highlight: true }); // -> false
```


### Setting the opening/closing tags
```javascript
new fuzzyfinder(openTag = '<b>', closeTag = '</b>');
ff.setOpenTag(tag);
ff.setCloseTag(tag);
```
The tags can be set at the moment the finder is instantiated or after that with the two setters.
