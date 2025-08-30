// Math utilities
// add: returns the sum of two numbers
function add(a, b) {
    // return the computed sum to the caller
    return a + b;
}

// sub: returns the difference between two numbers
function sub(a, b) {
    // return the result of subtraction to the caller
    return a - b;
}

// Function expression
// browser: simple function that returns the provided user value (demonstrates function expressions)
const browser = (user) => user;

// Async helpers
// loadImage: simulates an async image loading operation using a Promise and setTimeout
function loadImage() {
    // return a Promise that resolves after a delay to simulate async work
    return new Promise((resolve) => {
        // perform the "loading" after 2 seconds, then resolve the promise
        setTimeout(() => {
            console.log("Loading the image");
            resolve();
        }, 2000);
    });
}

// elementText: synchronous helper that logs when element text is being retrieved
function elementText() {
    // synchronous log to indicate immediate execution (no await needed)
    console.log("Loading the element text");
}

// Food flow using Promises
// orderFood: returns a Promise that resolves after selecting from the menu (simulated delay)
function orderFood() {
    // log immediately to indicate the order process has started
    return new Promise((resolve) => {
        console.log("Menu selected");
        // simulate ordering delay (e.g., placing an order)
        setTimeout(resolve, 3000);
    });
}

// prepareFood: returns a Promise that resolves when chef finishes preparation (simulated delay)
function prepareFood() {
    // log to indicate chef has started preparing
    return new Promise((resolve) => {
        console.log("Chef prepares");
        // simulate preparation delay
        setTimeout(resolve, 2000);
    });
}

// deliveredFood: synchronous step that marks delivery completion
function deliveredFood() {
    // final step: deliver to table (synchronous log)
    console.log("Delivered to table");
}

// Demo runner
async function main() {
    // demonstrate math utilities and show returned values
    console.log("add(4,5):", add(4, 5)); // prints 9
    console.log("add(2,3):", add(2, 3)); // prints 5
    console.log("sub(5,1):", sub(5, 1)); // prints 4
    console.log("sub(add(2,3),3):", sub(add(2, 3), 3)); // composes functions: sub(5,3) => 2

    // show simple prints and the function expression result
    console.log("vidya"); // plain string log
    console.log(browser("Dinesh")); // prints returned value from browser function expression

    // Asynchronous image load and element text (concurrent)
    // start loadImage without awaiting so it runs in parallel with elementText
    loadImage(); // starts the async image loading; does not block main
    elementText(); // runs immediately and logs synchronously

    // Ordered food flow using async/await (avoids callback hell)
    // await orderFood ensures the menu selection completes before preparation starts
    await orderFood(); // waits ~3s for order to be placed
    await prepareFood(); // waits ~2s for chef preparation
    deliveredFood(); // runs after preparation completes
}

// invoke the demo runner; errors would be unhandled here but none are expected in this demo
main();