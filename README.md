# [fuzzyfinder](https://github.com/rgehan/fuzzyfinder)


Fuzzyfinder allows to search a dataset with partial input. It also handles the highlighting of the matches. 

It is similar to the file search feature of Sublime Text or Atom.

There is an [example react app](https://github.com/rgehan/fuzzyfinder-example-app) demonstrating the module.

## Installation
```bash
$ npm install fuzzyfinder # or yarn add fuzzyfinder
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

/*
 * Output:
 * [{
 *   score: 123,
 *   text: '<b>a</b><b>b</b><b>s</b>olute'
 * }, {
 *   score: 123,
 *   text: '<b>a</b><b>b</b><b>s</b>olutely'
 * }, {
 *   ...
 * }]
 */
```

## API

### Methods configuration
A configuration object can be passed to both `search` and `match` methods.
Here is the default one:
```javascript
{
  highlight: false, // Generate the highlighted subject ?
  outputFull: false, // Output the whole subject ?
  getter: obj => obj, // The getter method allowing to extract the string from the subject
}
```

#### `{ highlight: true, ... }`
Enables the highlighting on the output.
Only the `text` field will be highlighted, the `subject` object, if passed, will be returned unaltered.

#### `{ outputFull: true, getter: obj => obj.name, ... }`
If `outputFull` is set to `true`, output the matched `subject` too.

If the search subject isn't an array of string, but for example `[{ product: 'Banana', price: 1.23 }, { product: 'Meat', price: 10.67 }]`, you will have to provide a getter function. This function allow the engine to extract the right string for each of the objects of the array.

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
search(string needle, array haystack [, options = {}])
```
It is probably the most useful method of the class, it searches the dataset and return the matches.

`haystack` can be an array of string, or an array of objects.
If it is an array of objects, the `getter` method has to be set to allow the engine to know on what field of the object to search.


### Finding out whether a string matches another
```javascript
match(string search, string subject [, options = {}])
```
It is the method used by `search`. It returns `false` if there is no match, or a match object if there is a match.

```javascript
ff.match('foo', 'foobar'); // -> { text: 'foobar', score: 123 }
ff.match('baz', 'foobar'); // -> false
ff.match('foo', 'foobar', { highlight: true }); // -> { text: '<f><o><o>bar', score: 123 }
ff.match('baz', 'foobar', { highlight: true }); // -> false
```


### Setting the opening/closing tags
```javascript
constructor(string openTag = '<b>', string closeTag = '</b>')
ff.setOpenTag(string tag)
ff.setCloseTag(string tag)
```
The tags can be set at the moment the finder is instantiated or after that with the two setters.
