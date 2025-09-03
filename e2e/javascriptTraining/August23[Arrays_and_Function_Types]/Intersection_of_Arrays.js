// Returns an array containing the intersection of arr1 and arr2, without duplicates
function intersection(arr1, arr2) {
    const result = [];
    for (let i = 0; i < arr1.length; i++) {
        const val = arr1[i];
        // Check if val exists in arr2 and is not already in result
        if (arr2.indexOf(val) !== -1 && result.indexOf(val) === -1) {
            result.push(val);
        }
    }
    return result;
}

// Example: typical case
console.log(intersection([1, 2, 2, 3, 4], [2, 4, 4, 6])); // [2, 4]

// Example: no common elements
console.log(intersection([1, 3, 5], [2, 4, 6])); // []

// Example: all elements common (with duplicates)
console.log(intersection([7, 7, 8], [7, 8, 8])); // [7, 8]
