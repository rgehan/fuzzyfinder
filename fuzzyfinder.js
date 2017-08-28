
class FuzzyFinder {
  constructor(openTag = '<b>', closeTag = '</b>') {
    this.setOpenTag(openTag);
    this.setCloseTag(closeTag);
  }

  setOpenTag(tag) {
    this.OPEN_TAG = tag;
  }

  setCloseTag(tag) {
    this.CLOSE_TAG = tag;
  }

  /**
   * Check if a string matches another string, and eventually
   * return the highlighted and scored result.
   */
  match(search, subject, options = {}) {
    // Eventually extract the search field if there is a need
    let getter = options.getter || (val => val);
    let string = getter(subject);

    // Early return in easy cases
    if(!search.length || !string.length)
      return false;

    // To prevent false-negative due to leading/trailing spaces
    let lowercased = string.toLowerCase();
    search = search.trim().toLowerCase();

    let matchesIndices = [];
    let currentIndex = 0;

    // Iterates over the string and sequentially try to find
    // characters from the search string
    for(let i = 0; i < string.length; i++) {
    	let c = lowercased[i];

      if(search[currentIndex] != c) continue;

      // Move the search index forward and mark it as a match
      currentIndex++;
      matchesIndices.push(i);

      // We reached the end of the search string and matched
      // every character
      if(currentIndex == search.length)
        return this.buildSearchResult(subject, matchesIndices, options);
    }

    return false;
  }

  /**
   * Highlight and compute the score of a given match
   */
  buildSearchResult(subject, matchesIndices, options = {}) {
    let getter = options.getter || (val => val);
    let shouldHighlight = options.highlight || false;
    let shouldOutputFull = options.outputFull || false;

    let string = getter(subject);

    let res = {
      score: this.computeScore(string, matchesIndices),
      text: shouldHighlight ? this.computeHighlight(string, matchesIndices) : string,
    };

    if(shouldOutputFull)
      res.subject = subject;

    return res;
  }

  /**
   * Perform a fuzzy-finder search on an array of strings and
   * eventually highlights the matches
   */
  search(needle, haystack, options = {}) {
    return haystack.map(subject => this.match(needle, subject, options))
                   .filter(_ => _) // Remove falsy results
                   .sort((a, b) => a.score - b.score)
                   .filter(obj => obj.score > 0);
  }

  /**
   * Compute the score of the match (the smaller the better) based
   * on the position of the match and the amount of unmatched characters
   *
   * Scoring algorithm from http://github.com/farzher/fuzzysort which is
   * better because it takes the position of the match into account
   */
  computeScore(string, indices) {
    let unmatchedChar = string.length - indices.length;

    let spreadPenalty = indices.reduce((acc, v, i) => {
      return v > 1 && indices[i - 1] != v - 1 ? acc + 1000 : acc
    }, 0);

    let groupsOffsetsPenalty = indices.reduce((acc, v, i) => {
      return v > 1 && indices[i - 1] != v - 1 ? acc + 1000 * indices[i] : acc;
    }, 0);

    return unmatchedChar + spreadPenalty + groupsOffsetsPenalty;
  }

  /**
   * Wrap any matched character with the open/close tags on each of the
   * passed string.
   */
  computeHighlight(string, indices) {
    return string.split('')
                 .map((c, i) => indices.indexOf(i) != -1 ? `${this.OPEN_TAG}${c}${this.CLOSE_TAG}` : c)
                 .join('');
  }
};

export default FuzzyFinder;
