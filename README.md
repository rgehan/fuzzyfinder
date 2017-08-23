# [fuzzyfinder](https://github.com/rgehan/fuzzyfinder)

This is a tiny fuzzyfinder-like search engine.

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

### Performing a search on a list of values
```javascript
search(needle, haystack, shouldHighlight = true);
```
It is probably the most useful method of the class, it searches the dataset and wrap each match with the specified tags.

`shouldHighlight` controls whether or not the matches are wrapped or not.


### Finding out whether a string matches another
```javascript
match(search, string, shouldHighlight = true);
```
It is the method used by `search`. It returns `false` if there is no match, or a match object if there is a match.

```javascript
ff.match('foo', 'foobar', false); // -> { text: 'foobar' }
ff.match('baz', 'foobar', false); // -> false
ff.match('foo', 'foobar', true); // -> { text: '<b>f</b><b>o</b><b>o</b>bar' }
ff.match('baz', 'foobar', true); // -> false
```


### Setting the opening/closing tags
```javascript
new fuzzyfinder(openTag = '<b>', closeTag = '</b>');
ff.setOpenTag(tag);
ff.setCloseTag(tag);
```
The tags can be set at the moment the finder is instantiated or after that with the two setters.
