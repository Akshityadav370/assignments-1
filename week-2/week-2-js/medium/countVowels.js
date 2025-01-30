/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  // Your code here
  const normalize = (str1) => str1.toLowerCase().replace(/\s+/g, "");

  let strArr = normalize(str).split("");

  let vowels = new Set(["a", "e", "i", "o", "u"]);

  let ans = strArr.reduce((count, item) => {
    if (vowels.has(item)) count++;
    return count;
  }, 0);

  return ans;
}

module.exports = countVowels;
