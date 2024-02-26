export const cart = [];

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
    });
  }
}
