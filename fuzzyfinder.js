
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
  match(search, string, shouldHighlight = true) {
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
      if(currentIndex == search.length) {
        if(!shouldHighlight)
        	return true;

        return this.buildSearchResult(string, matchesIndices);
      }
    }

    return false;
  }

  /**
   * Highlight and compute the score of a given match
   */
  buildSearchResult(string, matchesIndices) {
    return {
      score: this.computeScore(string, matchesIndices),
      text: this.computeHighlight(string, matchesIndices),
    };
  }

  /**
   * Perform a fuzzy-finder search on an array of strings and
   * eventually highlights the matches
   */
  search(needle, haystack, shouldHighlight = true) {
    let results = haystack.map(str => this.match(needle, str, shouldHighlight));

    // If no highlighting is required, indicates if there's a match
    if(!shouldHighlight)
      return results.some(el => !!el);

    return results.sort((a, b) => a.score - b.score)
                  .filter(obj => obj.score > 0)
                  .map(obj => obj.text);
  }

  computeScore(string, indices) {
    return 1;
  }

  computeHighlight(string, indices) {
    return string.split('')
                 .map((c, i) => indices.indexOf(i) != -1 ? `${this.OPEN_TAG}${c}${this.CLOSE_TAG}` : c)
                 .join('');
  }
};

export default FuzzyFinder;
