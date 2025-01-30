/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
  if (numbers.length === 0) return undefined;

  const largeNum = numbers.reduce(
    (no, item) => Math.max(no, item),
    Number.MIN_SAFE_INTEGER
  );

  return largeNum;
}

module.exports = findLargestElement;
