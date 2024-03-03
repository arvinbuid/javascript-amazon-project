import formatCurrency from "../utilities/money.js";

// Automated Testing

console.log("Test suite: formatCurrency");

console.log("converts cents into dollars");

// Basic testing

const test1 = formatCurrency(2095) === "20.95" ? "passed" : "failed";
console.log(test1);

console.log("works with 0");

const test2 = formatCurrency(0) === "0.00" ? "passed" : "failed";
console.log(test2);

// Edge testing
console.log("rounds up to the nearest cent");
const test3 = formatCurrency(2000.4) === "20.01" ? "passed" : "failed";
console.log(test3);
