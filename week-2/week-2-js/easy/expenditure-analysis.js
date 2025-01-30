/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let map = new Map();

  transactions.forEach((item) => {
    if (map.has(item.category)) {
      map.set(item.category, map.get(item.category) + item.price);
    } else {
      map.set(item.category, item.price);
    }
  });

  // Convert the Map to an array of objects
  const result = [];
  map.forEach((totalSpent, category) => {
    result.push({ category, totalSpent });
  });

  return result;
}

module.exports = calculateTotalSpentByCategory;
