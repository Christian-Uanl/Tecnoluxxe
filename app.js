const products = [
  { id: 1, name: "Funda lisa", category: "Fundas", price: 150, icon: "img/funda lisas.webp" },
  { id: 2, name: "Funda transparente", category: "Fundas", price: 150, icon: "img/fundas transparentes.webp" },
  { id: 3, name: "Funda sublimada", category: "Fundas", price: 220, icon: "img/fundas subliminadas.jpg" },
  { id: 4, name: "Funda de vinil", category: "Fundas", price: 250, icon: "img/fundas vinil.jpg" },

  { id: 5, name: "AirPods 2ª generación", category: "Audífonos", price: 350, icon: "img/airpods-2gen.jpg" },
  { id: 6, name: "AirPods 3ª generación", category: "Audífonos", price: 400, icon: "img/airpods-3gen.webp" },
  { id: 7, name: "EarPods", category: "Audífonos", price: 150, icon: "img/earpods.webp" },

  { id: 8, name: "Micas (paquete de 2)", category: "Micas", price: 150, icon: "img/micas.webp" },
  { id: 9, name: "Funda para AirPods", category: "Fundas", price: 150, icon: "img/funda airpods.webp" },
  { id: 10, name: "Funda para iPad", category: "Fundas", price: 200, icon: "img/funda ipad.webp" },

  { id: 11, name: "Cargador completo", category: "Cargadores", price: 250, icon: "img/cargador completo.webp" },
  { id: 12, name: "Cargador solo cable", category: "Cables", price: 150, icon: "img/cargador cable.webp" }
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

    const isImage = product.icon.startsWith("img/");

    const productImage = isImage
      ? `<img src="${product.icon}" alt="${product.name}">`
      : `<span style="font-size: 5rem;">${product.icon}</span>`;

    card.innerHTML = `
      <div class="product-img">
        ${productImage}
      </div>
      <div class="product-info">
        <p>${product.category}</p>
        <h3>${product.name}</h3>
        <p>$${product.price} MXN</p>
        <button onclick="addToCart(${product.id})">
          Agregar al carrito
        </button>
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

    renderProducts(
      products.filter(product => product.category === category)
    );

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

  if (!product) return;

  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
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
  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );

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

  cartItems.innerHTML = cart.map(item => {

    const isImage = item.icon.startsWith("img/");

    return `
      <div class="cart-item">

        <div class="cart-item-icon">
          ${
            isImage
              ? `<img src="${item.icon}" alt="${item.name}">`
              : item.icon
          }
        </div>

        <div>
          <h4>${item.name}</h4>
          <p>$${item.price} MXN c/u</p>

          <div class="cart-controls">
            <button onclick="changeQuantity(${item.id}, -1)">
              −
            </button>

            <strong>${item.quantity}</strong>

            <button onclick="changeQuantity(${item.id}, 1)">
              +
            </button>
          </div>
        </div>

        <button
          class="remove-item"
          onclick="removeFromCart(${item.id})"
          title="Eliminar">
          🗑️
        </button>

      </div>
    `;
  }).join("");
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

  alert(
    "Compra de prueba lista. Después esta función puede conectarse con Supabase o una pantalla de pago."
  );
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

loginOpen.addEventListener("click", () => {
  loginModal.classList.remove("hidden");
});

loginClose.addEventListener("click", () => {
  loginModal.classList.add("hidden");
});

loginForm.addEventListener("submit", event => {
  event.preventDefault();

  const email = document.getElementById("email").value;

  loginMessage.textContent =
    `Sesión de prueba iniciada con ${email}`;
});

const chatOpen = document.getElementById("chatOpen");
const chatClose = document.getElementById("chatClose");
const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

chatOpen.addEventListener("click", () => {
  chatBox.classList.remove("hidden");
});

chatClose.addEventListener("click", () => {
  chatBox.classList.add("hidden");
});

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

    botMessage.textContent =
      "Gracias por escribirnos. Un asesor revisará tu mensaje.";

    chatMessages.appendChild(botMessage);

    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 450);

  chatMessages.scrollTop = chatMessages.scrollHeight;
});

/* =====================================
   FUNCIONES ADICIONALES TECNOLUXXE
   ===================================== */

// CAMBIA ESTE NÚMERO POR EL WHATSAPP
// DEL EMPLEADO, INCLUYENDO EL CÓDIGO DE PAÍS.
// Ejemplo México: 528112345678
const TECNOLUXXE_WHATSAPP = "528118246564";


const employeeButton = document.createElement("a");

employeeButton.className = "employee-contact";
employeeButton.href = "#";
employeeButton.textContent = "💬 Atención en línea";
employeeButton.target = "_blank";

employeeButton.addEventListener("click", event => {
  event.preventDefault();

  const message = encodeURIComponent(
    "Hola, necesito ayuda con mi compra en Tecnoluxxe."
  );

  window.open(
    `https://wa.me/${TECNOLUXXE_WHATSAPP}?text=${message}`,
    "_blank"
  );
});

document.body.appendChild(employeeButton);


function addProductOptions() {

  document.querySelectorAll(".product-card").forEach(card => {

    if (card.dataset.optionsAdded) return;

    const title = card.querySelector("h3");

    if (!title) return;

    const productName = title.textContent.trim();

    const button = card.querySelector(".product-info button");

    if (!button) return;

    if (
      productName === "Funda lisa" ||
      productName === "Funda transparente"
    ) {

      card.dataset.optionsAdded = "true";

      const options = document.createElement("div");
      options.className = "product-options";

      options.innerHTML = `
        <label>Selecciona un color:</label>

        <select class="case-color">
          <option value="">Seleccionar color</option>
          <option>Negro</option>
          <option>Blanco</option>
          <option>Azul</option>
          <option>Rosa</option>
          <option>Morado</option>
          <option>Rojo</option>
          <option>Verde</option>
          <option>Transparente</option>
        </select>

        <label>Modelo de celular:</label>

        <select class="case-model">
          <option value="">Seleccionar modelo</option>
          <option>iPhone 11</option>
          <option>iPhone 12</option>
          <option>iPhone 13</option>
          <option>iPhone 14</option>
          <option>iPhone 15</option>
          <option>iPhone 16</option>
          <option>Samsung Galaxy</option>
          <option>Motorola</option>
          <option>Xiaomi</option>
          <option>Otro modelo</option>
        </select>
      `;

      button.before(options);
      button.removeAttribute("onclick");

      button.addEventListener("click", () => {

        const color = card.querySelector(".case-color").value;
        const model = card.querySelector(".case-model").value;

        if (!color || !model) {
          alert("Selecciona el color y modelo de tu celular.");
          return;
        }

        const product = products.find(
          item => item.name === productName
        );

        if (!product) return;
        
        const newItem = {
          ...product,
          id: Date.now() + Math.floor(Math.random() * 1000),
          name: `${product.name} (${color} - ${model})`,
          quantity: 1
        };

        cart.push(newItem);

        saveCart();
        renderCart();
        openCart();

      });
    }


    if (productName === "Funda de vinil") {

      card.dataset.optionsAdded = "true";

      button.removeAttribute("onclick");

      const customizeButton = document.createElement("button");

      customizeButton.className = "customize-btn";
      customizeButton.textContent = "Personalizar mi funda";

      button.after(customizeButton);

      button.textContent = "Agregar funda de vinil";

      button.addEventListener("click", () => {
        addToCart(4);
      });

      customizeButton.addEventListener("click", () => {
        document.getElementById("vinylModal").classList.remove("hidden");
      });
    }

  });
}

const productObserver = new MutationObserver(() => {
  addProductOptions();
});

productObserver.observe(productsGrid, {
  childList: true
});

addProductOptions();

const vinylModal = document.createElement("div");

vinylModal.id = "vinylModal";
vinylModal.className = "custom-modal hidden";

vinylModal.innerHTML = `
  <div class="custom-modal-content">

    <button class="custom-close" id="closeVinylModal">
      ×
    </button>

    <h2>Personaliza tu funda</h2>

    <p>
      Cuéntanos cómo quieres que sea tu funda de vinil.
    </p>

    <form id="vinylForm">

      <label>Modelo de celular:</label>

      <input
        type="text"
        id="vinylModel"
        placeholder="Ej. iPhone 15 Pro"
        required
      >

      <label>Describe tu diseño:</label>

      <textarea
        id="vinylDescription"
        placeholder="Describe los colores, imágenes, nombres o detalles que deseas..."
        required
      ></textarea>

      <label>Agrega tus imágenes de referencia:</label>

      <input
        type="file"
        id="vinylImages"
        accept="image/*"
        multiple
      >

      <p id="vinylFileMessage">
        Puedes seleccionar varias imágenes.
      </p>

      <button type="submit">
        Enviar personalización
      </button>

    </form>

  </div>
`;

document.body.appendChild(vinylModal);

document.getElementById("closeVinylModal").addEventListener("click", () => {
  vinylModal.classList.add("hidden");
});

vinylModal.addEventListener("click", event => {
  if (event.target === vinylModal) {
    vinylModal.classList.add("hidden");
  }
});

document.getElementById("vinylImages").addEventListener("change", event => {

  const files = Array.from(event.target.files);

  document.getElementById("vinylFileMessage").textContent =
    files.length
      ? `Imágenes seleccionadas: ${files.map(file => file.name).join(", ")}`
      : "Puedes seleccionar varias imágenes.";

});

document.getElementById("vinylForm").addEventListener("submit", event => {

  event.preventDefault();

  const model = document.getElementById("vinylModel").value.trim();

  const description = document.getElementById("vinylDescription").value.trim();

  const files = Array.from(
    document.getElementById("vinylImages").files
  );

  const message = `
Hola, quiero personalizar una funda de vinil en Tecnoluxxe.

Modelo de celular: ${model}

Descripción del diseño:
${description}

Imágenes seleccionadas: ${files.length}

Enviaré las imágenes adjuntas en este chat.
  `;

  window.open(
    `https://wa.me/${TECNOLUXXE_WHATSAPP}?text=${encodeURIComponent(message)}`,
    "_blank"
  );

  vinylModal.classList.add("hidden");
  document.getElementById("vinylForm").reset();

  document.getElementById("vinylFileMessage").textContent =
    "Puedes seleccionar varias imágenes.";

});

const oldCheckoutButton = document.getElementById("checkoutBtn");

const newCheckoutButton = oldCheckoutButton.cloneNode(true);

oldCheckoutButton.replaceWith(newCheckoutButton);

newCheckoutButton.addEventListener("click", () => {

  if (!cart.length) {
    alert("Tu carrito está vacío.");
    return;
  }

  const selectedPayment = document.querySelector(
    'input[name="paymentMethod"]:checked'
  );

  if (!selectedPayment) {
    alert("Selecciona un método de pago.");
    return;
  }

  const payment = selectedPayment.value;

  const orderDetails = cart.map(item => {
    return `- ${item.name} x${item.quantity}: $${item.price * item.quantity} MXN`;
  }).join("\n");

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const message = `
Hola, quiero realizar un pedido en Tecnoluxxe.

PRODUCTOS:
${orderDetails}

TOTAL: $${total} MXN

MÉTODO DE PAGO: ${payment}

Quisiera recibir información para continuar con mi compra.
  `;

  window.open(
    `https://wa.me/${TECNOLUXXE_WHATSAPP}?text=${encodeURIComponent(message)}`,
    "_blank"
  );

});
