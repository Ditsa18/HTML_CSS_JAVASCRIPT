// --- CART LOGIC ---

let cart = [];
let cartOpen = false;

// Grab DOM elements
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartPanel = document.getElementById("cart-panel");

// Load cart from localStorage when page loads
window.onload = () => {
  const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = savedCart;
  updateCart();
};

// Add to Cart
function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1; // if already in cart, increase qty
  } else {
    cart.push({ name, price, qty: 1 });
  }
  updateCart();
}

// Update Cart Display
function updateCart() {
  // Save to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update count
  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);

  // Reset list
  cartItems.innerHTML = "";
  if (cart.length === 0) {
    cartItems.innerHTML = "<li class='empty'>Your cart is empty.</li>";
  }

  // Render items
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.qty;
    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
      <span>${item.name} (x${item.qty})</span>
      <span>₹${item.price * item.qty}</span>
      <div>
        <button onclick="increaseQty(${index})" aria-label="Increase">+</button>
        <button onclick="decreaseQty(${index})" aria-label="Decrease">-</button>
        <button onclick="removeFromCart(${index})" aria-label="Remove">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
    cartItems.appendChild(li);
  });

  // Update total
  cartTotal.textContent = `Total: ₹${total}`;
}

// Increase qty
function increaseQty(index) {
  cart[index].qty++;
  updateCart();
}

// Decrease qty
function decreaseQty(index) {
  if (cart[index].qty > 1) {
    cart[index].qty--;
  } else {
    cart.splice(index, 1); // remove if qty = 0
  }
  updateCart();
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Toggle Cart Panel
function toggleCart() {
  cartOpen = !cartOpen;
  cartPanel.style.right = cartOpen ? "0" : "-400px";
  cartPanel.setAttribute("aria-hidden", !cartOpen);
  
}
