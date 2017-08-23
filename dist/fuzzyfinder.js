'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FuzzyFinder = function () {
  function FuzzyFinder() {
    var openTag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '<b>';
    var closeTag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '</b>';
    (0, _classCallCheck3.default)(this, FuzzyFinder);

    this.setOpenTag(openTag);
    this.setCloseTag(closeTag);
  }

  (0, _createClass3.default)(FuzzyFinder, [{
    key: 'setOpenTag',
    value: function setOpenTag(tag) {
      this.OPEN_TAG = tag;
    }
  }, {
    key: 'setCloseTag',
    value: function setCloseTag(tag) {
      this.CLOSE_TAG = tag;
    }

    /**
     * Check if a string matches another string, and eventually
     * return the highlighted and scored result.
     */

  }, {
    key: 'match',
    value: function match(search, subject) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      // Eventually extract the search field if there is a need
      var getter = options.getter || function (val) {
        return val;
      };
      var string = getter(subject);

      // Early return in easy cases
      if (!search.length || !string.length) return false;

      // To prevent false-negative due to leading/trailing spaces
      var lowercased = string.toLowerCase();
      search = search.trim().toLowerCase();

      var matchesIndices = [];
      var currentIndex = 0;

      // Iterates over the string and sequentially try to find
      // characters from the search string
      for (var i = 0; i < string.length; i++) {
        var c = lowercased[i];

        if (search[currentIndex] != c) continue;

        // Move the search index forward and mark it as a match
        currentIndex++;
        matchesIndices.push(i);

        // We reached the end of the search string and matched
        // every character
        if (currentIndex == search.length) return this.buildSearchResult(subject, matchesIndices, options);
      }

      return false;
    }

    /**
     * Highlight and compute the score of a given match
     */

  }, {
    key: 'buildSearchResult',
    value: function buildSearchResult(subject, matchesIndices) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var getter = options.getter || function (val) {
        return val;
      };
      var shouldHighlight = options.highlight || false;
      var shouldOutputFull = options.outputFull || false;

      var string = getter(subject);

      var res = {
        score: this.computeScore(string, matchesIndices),
        text: shouldHighlight ? this.computeHighlight(string, matchesIndices) : string
      };

      if (shouldOutputFull) res.subject = subject;

      return res;
    }

    /**
     * Perform a fuzzy-finder search on an array of strings and
     * eventually highlights the matches
     */

  }, {
    key: 'search',
    value: function search(needle, haystack) {
      var _this = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return haystack.map(function (subject) {
        return _this.match(needle, subject, options);
      }).filter(function (_) {
        return _;
      }) // Remove falsy results
      .sort(function (a, b) {
        return a.score - b.score;
      }).filter(function (obj) {
        return obj.score > 0;
      });
    }

    /**
     * Compute the score of the match (the smaller the better) based
     * on the position of the match and the amount of unmatched characters
     *
     * Scoring algorithm from http://github.com/farzher/fuzzysort which is
     * better because it takes the position of the match into account
     */

  }, {
    key: 'computeScore',
    value: function computeScore(string, indices) {
      var unmatchedChar = string.length - indices.length;
      var groupsOffset = indices.reduce(function (acc, v, i) {
        return i > 1 && indices[i - 1] != v - 1 ? acc + 1000 * indices[i] : acc;
      }, 0);

      return unmatchedChar + groupsOffset;
    }

    /**
     * Wrap any matched character with the open/close tags on each of the
     * passed string.
     */

  }, {
    key: 'computeHighlight',
    value: function computeHighlight(string, indices) {
      var _this2 = this;

      return string.split('').map(function (c, i) {
        return indices.indexOf(i) != -1 ? '' + _this2.OPEN_TAG + c + _this2.CLOSE_TAG : c;
      }).join('');
    }
  }]);
  return FuzzyFinder;
}();

;

exports.default = FuzzyFinder;
