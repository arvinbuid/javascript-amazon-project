import {renderOrderSummary} from "../../scripts/checkout/orderSummary.js";
import {loadFromStorage, cart} from "../../data/cart.js";

// 2 things to test:
// how the page look and how the page behave

describe("Test suite: renderOrderSummary", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  // Jasmine Hooks

  beforeEach(() => {
    // mocking the localStorage so the test will not modify it
    spyOn(localStorage, "setItem");
    document.querySelector(".js-test-container").innerHTML = `
       <div class="js-order-summary"></div>
       <div class="js-checkout-header"></div>
       <div class="js-payment-summary"></div>
      `;

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });
    loadFromStorage();

    renderOrderSummary();
  });

  // this test the function if it display the order summary data correctly
  it("displays the cart", () => {
    // test the function if the first element has 2 quantity in the cart and if it is correct
    expect(document.querySelectorAll(".js-cart-item-container-test").length).toEqual(2);
    expect(document.querySelector(`.js-product-quantity-test-${productId1}`).innerText).toContain(
      "Quantity: 2"
    );
    expect(document.querySelector(`.js-product-quantity-test-${productId2}`).innerText).toContain(
      "Quantity: 1"
    );
  });

  afterEach(() => {
    // remove HTML after test
    document.querySelector(".js-test-container").innerHTML = "";
  });

  // this test the delete button of the function when it is clicked
  it("removes a product", () => {
    document.querySelector(`.js-delete-link-test-${productId1}`).click();
    // test to check if the quantity is equals to 1 when the user click delete one time
    expect(document.querySelectorAll(".js-cart-item-container-test").length).toEqual(1);
    // test to check if product1 is not on the cart after user click delete
    expect(document.querySelector(`.js-product-quantity-test-${productId1}`)).toEqual(null);
    // test to check if product2 is on the cart after user click delete
    expect(document.querySelector(`.js-product-quantity-test-${productId2}`)).not.toEqual(null);

    // test to check if cart length is equal to 1
    expect(cart.length).toEqual(1);
    // test to check if product 1 is removed and product 2 is on the cart
    expect(cart[0].productId).toEqual(productId2);
  });

  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = "";
  });
});
