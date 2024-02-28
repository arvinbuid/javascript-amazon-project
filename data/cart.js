// loading the cart from localStorage
export let cart = JSON.parse(localStorage.getItem("cart"));

// if the cart is empty, assign default value to cart
if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1",
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: "2",
    },
  ];
}

// Function to save the cart into localStorage

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  // Variable to store the same items in the cart
  let matchingItem;

  // Figuring out if the product is already in the cart
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  // If the product is on the cart, increase its quantity by 1
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: "1",
    });
  }

  saveToStorage();
}

// Remove item from the cart
export function removeFromCart(productId) {
  const newCart = [];

  // Add each cartItem into the new array except if it has the productId
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}
