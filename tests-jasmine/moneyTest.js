import formatCurrency from "../scripts/utilities/money.js";

// test suite
describe("Test suite: formatCurrency", () => {
  // name of test
  it("converts cents into dollars", () => {
    // test to perform
    expect(formatCurrency(2095)).toEqual("20.95");
  });
  it("works with 0", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });
  it("rounds up to the nearest cent", () => {
    expect(formatCurrency(2000.4)).toEqual("20.01");
  });
});
