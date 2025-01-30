/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  const normalize = (str) => str.toLowerCase().replace(/\s+/g, "");

  const char1 = normalize(str1).split("").sort();
  const char2 = normalize(str2).split("").sort();

  // Compare sorted arrays
  if (char1.length !== char2.length) return false;

  for (let i = 0; i < char1.length; i++) {
    if (char1[i] !== char2[i]) return false;
  }

  return true;
}

module.exports = isAnagram;
