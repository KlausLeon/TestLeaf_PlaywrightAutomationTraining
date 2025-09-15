// Demonstration of a union-like type using JSDoc in a .ts file runnable by Node
// In pure TypeScript you'd write: type ApiStatus = number | string; but we use JSDoc so no transpiler is needed
/**
 * @typedef {(number|string)} ApiStatus
 */
// Declare that the next variable uses the ApiStatus union (number or string)
/** @type {ApiStatus} */
let stat; // Variable that can hold either a number or a string
stat = 200; // Assign a numeric status code
console.log(stat); // Print the current status (200)
stat = "SUCCESS"; // Reassign with a string status
console.log(stat); // Print the current status ("SUCCESS")

