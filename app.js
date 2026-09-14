const products = [
  { id: 1, name: "Funda lisa", category: "Fundas", price: 150, icon: "https://tse1.mm.bing.net/th/id/OIP.UiXL92XSSXmRBseRCycnNQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 2, name: "Funda transparente", category: "Fundas", price: 150, icon: "📱" },
  { id: 3, name: "Funda sublimada", category: "Fundas", price: 220, icon: "🎨" },
  { id: 4, name: "Funda de vinil", category: "Fundas", price: 250, icon: "✨" },
  { id: 5, name: "AirPods 2ª generación", category: "Audífonos", price: 350, icon: "🎧" },
  { id: 6, name: "AirPods 3ª generación", category: "Audífonos", price: 400, icon: "🎧" },
  { id: 7, name: "EarPods", category: "Audífonos", price: 150, icon: "🎵" },
  { id: 8, name: "Micas (paquete de 2)", category: "Micas", price: 150, icon: "🪟" },
  { id: 9, name: "Funda para AirPods", category: "Fundas", price: 150, icon: "🎧" },
  { id: 10, name: "Funda para iPad", category: "Fundas", price: 200, icon: "💻" },
  { id: 11, name: "Cargador con cuadro", category: "Cargadores", price: 250, icon: "🔌" },
  { id: 12, name: "Cargador solo cable", category: "Cables", price: 150, icon: "🔗" }
];

const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");

let cart = JSON.parse(localStorage.getItem("tecnoluxxeCart") || "[]");

function renderProducts(list) {
  productsGrid.innerHTML = "";

  if (!list.length) {
    productsGrid.innerHTML = "<p>No se encontraron productos.</p>";
    return;
  }

  list.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-img">${product.icon}</div>
      <div class="product-info">
        <p>${product.category}</p>
        <h3>${product.name}</h3>
        <p>$${product.price} MXN</p>
        <button onclick="addToCart(${product.id})">Agregar al carrito</button>
      </div>
    `;

    productsGrid.appendChild(card);
  });
}

renderProducts(products);

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(value) ||
    product.category.toLowerCase().includes(value)
  );

  renderProducts(filtered);
});

document.querySelectorAll("[data-category]").forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    renderProducts(products.filter(product => product.category === category));
    document.getElementById("productos").scrollIntoView();
  });
});

const cartOpen = document.getElementById("cartOpen");
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const cartClose = document.getElementById("cartClose");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const clearCartBtn = document.getElementById("clearCartBtn");
const checkoutBtn = document.getElementById("checkoutBtn");

function saveCart() {
  localStorage.setItem("tecnoluxxeCart", JSON.stringify(cart));
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  renderCart();
  openCart();
}

function changeQuantity(productId, amount) {
  const item = cart.find(product => product.id === productId);
  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(product => product.id !== productId);
  }

  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(product => product.id !== productId);
  saveCart();
  renderCart();
}

function renderCart() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  cartCount.textContent = totalItems;
  cartTotal.textContent = `$${totalPrice} MXN`;

  if (!cart.length) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <div style="font-size:3rem;">🛒</div>
        <h3>Tu carrito está vacío</h3>
        <p>Agrega productos para verlos aquí.</p>
      </div>
    `;
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-icon">${item.icon}</div>
      <div>
        <h4>${item.name}</h4>
        <p>$${item.price} MXN c/u</p>
        <div class="cart-controls">
          <button onclick="changeQuantity(${item.id}, -1)">−</button>
          <strong>${item.quantity}</strong>
          <button onclick="changeQuantity(${item.id}, 1)">+</button>
        </div>
      </div>
      <button class="remove-item" onclick="removeFromCart(${item.id})" title="Eliminar">🗑️</button>
    </div>
  `).join("");
}

function openCart() {
  cartPanel.classList.remove("hidden");
  cartOverlay.classList.remove("hidden");
}

function closeCart() {
  cartPanel.classList.add("hidden");
  cartOverlay.classList.add("hidden");
}

cartOpen.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

clearCartBtn.addEventListener("click", () => {
  if (!cart.length) return;

  if (confirm("¿Quieres vaciar todo el carrito?")) {
    cart = [];
    saveCart();
    renderCart();
  }
});

checkoutBtn.addEventListener("click", () => {
  if (!cart.length) {
    alert("Tu carrito está vacío.");
    return;
  }

  alert("Compra de prueba lista. Después esta función puede conectarse con Supabase o una pantalla de pago.");
});

renderCart();

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

const loginModal = document.getElementById("loginModal");
const loginOpen = document.getElementById("loginOpen");
const loginClose = document.getElementById("loginClose");
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginOpen.addEventListener("click", () => loginModal.classList.remove("hidden"));
loginClose.addEventListener("click", () => loginModal.classList.add("hidden"));

loginForm.addEventListener("submit", event => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  loginMessage.textContent = `Sesión de prueba iniciada con ${email}`;

  // AQUÍ se reemplazará por Supabase Auth.
});

const chatOpen = document.getElementById("chatOpen");
const chatClose = document.getElementById("chatClose");
const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

chatOpen.addEventListener("click", () => chatBox.classList.remove("hidden"));
chatClose.addEventListener("click", () => chatBox.classList.add("hidden"));

chatForm.addEventListener("submit", event => {
  event.preventDefault();

  const text = chatInput.value.trim();
  if (!text) return;

  const userMessage = document.createElement("div");
  userMessage.className = "user-msg";
  userMessage.textContent = text;
  chatMessages.appendChild(userMessage);

  chatInput.value = "";

  setTimeout(() => {
    const botMessage = document.createElement("div");
    botMessage.className = "bot-msg";
    botMessage.textContent = "Gracias por escribirnos. Un asesor revisará tu mensaje.";
    chatMessages.appendChild(botMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 450);

  chatMessages.scrollTop = chatMessages.scrollHeight;
});
