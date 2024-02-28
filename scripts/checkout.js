import {cart, removeFromCart, updateDeliveryOption} from "../data/cart.js";
import {products} from "../data/products.js";
import formatCurrency from "./utilities/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {deliveryOptions} from "../data/deliveryOptions.js";

let cartSummaryHTML = "";

// dayjs() is an function that gives us the today's date information

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  // variable to get the deliveryOptionId from cart variable in cart.js
  const deliveryOptionId = cartItem.deliveryOptionId;

  // variable to store the result from looping in deliveryOptions.js to find the matching id inside the cart variable in cart.js
  let deliveryOption;

  // logic of the looping mentioned from above
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  // calling dayjs() to get the current date
  const today = dayjs();
  // getting the delivery days from deliveryOptions.js to add into the current date
  const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
  // converting the deliveryDate variable into a readable date format
  const dateString = deliveryDate.format("dddd MMMM D");

  cartSummaryHTML += `
    <div class="cart-item-container 
      js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                  matchingProduct.id
                }">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
           </div>
       </div>
   </div>
    `;
});

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = "";

  deliveryOptions.forEach((deliveryOption) => {
    // calling dayjs() to get the current date
    const today = dayjs();
    // getting the delivery days from deliveryOptions.js to add into the current date
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    // converting the deliveryDate variable into a readable date format
    const dateString = deliveryDate.format("dddd MMMM D");

    const priceString =
      deliveryOption.priceCents === 0 ? "FREE" : `$${formatCurrency(deliveryOption.priceCents)} -`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option js-delivery-option" 
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? "checked" : ""}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
          <div class="delivery-option-date">
              ${dateString}
          </div>
          <div class="delivery-option-price">
              ${priceString} Shipping
          </div>
        </div>
      </div>
     `;
  });

  return html;
}

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    // targeting the delete button productId to be remove from the HTML
    const container = document.querySelector(`.js-cart-item-container-${productId}`);

    // remove cart item from HTML DOM
    container.remove();
  });
});

document.querySelectorAll(".js-delivery-option").forEach((element) => {
  element.addEventListener("click", () => {
    const {productId, deliveryOptionId} = element.dataset;

    // updating the HTML of delivery option when the user choose a different delivery option and refresh the page
    updateDeliveryOption(productId, deliveryOptionId);
  });
});
