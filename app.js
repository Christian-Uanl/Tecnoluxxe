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

        <button type="button" onclick="openCustomize(${product.id})">
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


function addToCart(productId, selectedColor) {
  const product = products.find(item => item.id === productId);

  if (!product) return;

  if (!selectedColor) {
    alert("Selecciona un color antes de agregar el producto.");
    return;
  }

  const existing = cart.find(item =>
    item.id === productId && item.color === selectedColor
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      ...product,
      color: selectedColor,
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

const catalogoModelos = {

  "Apple iPhone": [
    "iPhone X", "iPhone XR", "iPhone XS", "iPhone XS Max",
    "iPhone 11", "iPhone 11 Pro", "iPhone 11 Pro Max",
    "iPhone 12 mini", "iPhone 12", "iPhone 12 Pro", "iPhone 12 Pro Max",
    "iPhone 13 mini", "iPhone 13", "iPhone 13 Pro", "iPhone 13 Pro Max",
    "iPhone 14", "iPhone 14 Plus", "iPhone 14 Pro", "iPhone 14 Pro Max",
    "iPhone 15", "iPhone 15 Plus", "iPhone 15 Pro", "iPhone 15 Pro Max",
    "iPhone 16e", "iPhone 16", "iPhone 16 Plus", "iPhone 16 Pro", "iPhone 16 Pro Max",
    "iPhone 17e", "iPhone 17", "iPhone 17 Air", "iPhone 17 Pro", "iPhone 17 Pro Max",
    "iPhone 18 Pro", "iPhone 18 Pro Max", "iPhone Duo (confirmar disponibilidad)"
  ],

  "Samsung Galaxy": [
    "Galaxy A04", "Galaxy A04e", "Galaxy A05", "Galaxy A05s",
    "Galaxy A06", "Galaxy A07", "Galaxy A14", "Galaxy A15 4G",
    "Galaxy A15 5G", "Galaxy A16", "Galaxy A17", "Galaxy A22",
    "Galaxy A23", "Galaxy A24", "Galaxy A25", "Galaxy A26",
    "Galaxy A32", "Galaxy A33", "Galaxy A34", "Galaxy A35",
    "Galaxy A36", "Galaxy A52", "Galaxy A53", "Galaxy A54",
    "Galaxy A55", "Galaxy A56",
    "Galaxy S20", "Galaxy S20+", "Galaxy S20 Ultra",
    "Galaxy S21", "Galaxy S21+", "Galaxy S21 Ultra", "Galaxy S21 FE",
    "Galaxy S22", "Galaxy S22+", "Galaxy S22 Ultra",
    "Galaxy S23", "Galaxy S23+", "Galaxy S23 Ultra", "Galaxy S23 FE",
    "Galaxy S24", "Galaxy S24+", "Galaxy S24 Ultra", "Galaxy S24 FE",
    "Galaxy S25", "Galaxy S25+", "Galaxy S25 Ultra", "Galaxy S25 FE",
    "Galaxy S26", "Galaxy S26+", "Galaxy S26 Ultra",
    "Galaxy Z Flip 3", "Galaxy Z Flip 4", "Galaxy Z Flip 5",
    "Galaxy Z Flip 6", "Galaxy Z Flip 7",
    "Galaxy Z Fold 3", "Galaxy Z Fold 4", "Galaxy Z Fold 5",
    "Galaxy Z Fold 6", "Galaxy Z Fold 7",
    "Galaxy M12", "Galaxy M13", "Galaxy M14", "Galaxy M15",
    "Galaxy M23", "Galaxy M32", "Galaxy M33", "Galaxy M34",
    "Galaxy M35", "Galaxy M51", "Galaxy M52", "Galaxy M54", "Galaxy M55"
  ],

  "Xiaomi / Redmi": [
    "Redmi Note 10", "Redmi Note 10S", "Redmi Note 10 Pro",
    "Redmi Note 11", "Redmi Note 11S", "Redmi Note 11 Pro", "Redmi Note 11 Pro 5G",
    "Redmi Note 12", "Redmi Note 12S", "Redmi Note 12 Pro",
    "Redmi Note 12 Pro 5G", "Redmi Note 12 Pro+ 5G",
    "Redmi Note 13", "Redmi Note 13 5G", "Redmi Note 13 Pro",
    "Redmi Note 13 Pro 5G", "Redmi Note 13 Pro+ 5G",
    "Redmi Note 14", "Redmi Note 14 5G", "Redmi Note 14 Pro",
    "Redmi Note 14 Pro 5G", "Redmi Note 14 Pro+ 5G",
    "Redmi Note 15", "Redmi Note 15 Pro", "Redmi Note 15 Pro+ 5G",
    "Redmi Note 17 (confirmar proveedor)",
    "Redmi 10", "Redmi 10C", "Redmi 12", "Redmi 12C",
    "Redmi 13", "Redmi 13C", "Redmi 14C", "Redmi 15C",
    "Xiaomi 12", "Xiaomi 12T", "Xiaomi 13", "Xiaomi 13T",
    "Xiaomi 14", "Xiaomi 14T", "Xiaomi 15", "Xiaomi 15T", "Xiaomi 17"
  ],

  "OPPO": [
    "OPPO A16", "OPPO A17", "OPPO A18", "OPPO A38",
    "OPPO A40", "OPPO A58", "OPPO A60",
    "OPPO Reno 7", "OPPO Reno 8", "OPPO Reno 8T",
    "OPPO Reno 10", "OPPO Reno 11", "OPPO Reno 11F",
    "OPPO Reno 12", "OPPO Reno 12F",
    "OPPO Reno 13", "OPPO Reno 13F",
    "OPPO Reno 14", "OPPO Reno 14F", "OPPO Reno 16"
  ],

  "Motorola": [
    "Moto G04", "Moto G05", "Moto G06", "Moto G13", "Moto G14",
    "Moto G15", "Moto G22", "Moto G23", "Moto G24", "Moto G24 Power",
    "Moto G30", "Moto G31", "Moto G32", "Moto G34", "Moto G35",
    "Moto G40", "Moto G41", "Moto G42", "Moto G50", "Moto G51",
    "Moto G52", "Moto G53", "Moto G54", "Moto G55", "Moto G56",
    "Moto G60", "Moto G62", "Moto G64", "Moto G71", "Moto G72",
    "Moto G73", "Moto G75", "Moto G82", "Moto G84", "Moto G85", "Moto G86",
    "Motorola Edge 30", "Motorola Edge 30 Neo", "Motorola Edge 30 Fusion",
    "Motorola Edge 40", "Motorola Edge 40 Neo",
    "Motorola Edge 50", "Motorola Edge 50 Fusion", "Motorola Edge 50 Pro",
    "Motorola Edge 60", "Motorola Edge 60 Fusion", "Motorola Edge 60 Pro",
    "Motorola Edge 70",
    "Motorola Razr 40", "Motorola Razr 40 Ultra",
    "Motorola Razr 50", "Motorola Razr 50 Ultra",
    "Motorola Razr 60", "Motorola Razr 60 Ultra"
  ]
};


const catalogoColores = [
  "Transparente / cristal",
  "Negro", "Blanco", "Gris", "Plata", "Dorado", "Champagne",
  "Rosa", "Rosa pastel", "Rosa bebé", "Rosa palo",
  "Rosa fucsia", "Rosa mexicano",
  "Lila", "Lavanda", "Morado", "Morado pastel",
  "Azul cielo", "Azul pastel", "Azul marino", "Azul rey", "Azul eléctrico",
  "Verde menta", "Verde pastel", "Verde olivo", "Verde botella",
  "Rojo", "Vino / borgoña", "Naranja", "Amarillo", "Amarillo pastel",
  "Beige", "Crema", "Café", "Chocolate", "Caramelo",
  "Menta", "Turquesa", "Multicolor", "Personalizado"
];

const catalogoTransparentes = [
  "TR-01 Transparente total",
  "TR-02 Transparente con borde de color",
  "TR-03 Transparente con MagSafe",
  "TR-04 Transparente con borde + MagSafe",
  "TR-05 Transparente con tarjetero",
  "TR-06 Transparente tarjetero sin borde marcado",
  "TR-07 Transparente con tapa / porta tarjeta",
  "TR-08 Transparente reforzada",
  "TR-09 Transparente con glitter",
  "TR-10 Transparente con diseño impreso"
];


function addProductOptions() {

  document.querySelectorAll(".product-card").forEach(card => {

    if (card.dataset.optionsAdded) return;

    const title = card.querySelector("h3");
    const button = card.querySelector(".product-info button");

    if (!title || !button) return;

    const productName = title.textContent.trim();

    const esLisa = productName === "Funda lisa";
    const esTransparente = productName === "Funda transparente";
    const esIpad = productName === "Funda para iPad";
    const esAirpods = productName === "Funda para AirPods";

    const esVinil = productName === "Funda de vinil";
    const esSublimada = productName === "Funda sublimada";

    if (
      !esLisa && !esTransparente && !esIpad &&
      !esAirpods && !esVinil && !esSublimada
    ) return;

    card.dataset.optionsAdded = "true";

    if (esLisa || esTransparente || esIpad || esAirpods) {

      const options = document.createElement("div");
      options.className = "product-options";

      let modelos = [];

      if (esIpad) {
        modelos = [
          "iPad 9ª generación",
          "iPad 10ª generación",
          "iPad Air",
          "iPad Air M2",
          "iPad Air M3",
          "iPad Pro 11 pulgadas",
          "iPad Pro 12.9 pulgadas",
          "iPad Pro 13 pulgadas",
          "Otro modelo"
        ];
      } else if (esAirpods) {
        modelos = [
          "AirPods 1ª generación",
          "AirPods 2ª generación",
          "AirPods 3ª generación",
          "AirPods 4ª generación",
          "AirPods Pro",
          "AirPods Pro 2ª generación",
          "Otro modelo"
        ];
      } else {
        modelos = Object.values(catalogoModelos).flat();
      }

      options.innerHTML = `
        <label>Marca / modelo:</label>

        <select class="case-model" required>
          <option value="">Seleccionar modelo</option>
          ${modelos.map(modelo =>
            `<option value="${modelo}">${modelo}</option>`
          ).join("")}
        </select>

        <label>Color:</label>

        <select class="case-color" required>
          <option value="">Seleccionar color</option>
          ${catalogoColores.map(color =>
            `<option value="${color}">${color}</option>`
          ).join("")}
        </select>

        ${esTransparente ? `
          <label>Tipo de diseño:</label>

          <select class="case-design" required>
            <option value="">Seleccionar diseño</option>
            ${catalogoTransparentes.map(diseno =>
              `<option value="${diseno}">${diseno}</option>`
            ).join("")}
          </select>
        ` : ""}

        ${esLisa ? `
          <label>Acabado:</label>
          <select class="case-finish">
            <option>Mate</option>
            <option>Brillante</option>
          </select>

          <label>Material:</label>
          <select class="case-material">
            <option>Silicona</option>
            <option>Rígida</option>
          </select>
        ` : ""}
      `;

      button.before(options);
      button.removeAttribute("onclick");

      button.addEventListener("click", () => {

        const model = card.querySelector(".case-model").value;
        const color = card.querySelector(".case-color").value;
        const design = card.querySelector(".case-design")?.value || "";
        const finish = card.querySelector(".case-finish")?.value || "";
        const material = card.querySelector(".case-material")?.value || "";

        if (!model || !color || (esTransparente && !design)) {
          alert("Completa las opciones del producto antes de agregarlo.");
          return;
        }

        const product = products.find(item => item.name === productName);
        if (!product) return;

        const details = [
          model,
          color,
          design,
          finish,
          material
        ].filter(Boolean).join(" - ");

        cart.push({
          ...product,
          id: Date.now() + Math.floor(Math.random() * 10000),
          name: `${product.name} (${details})`,
          quantity: 1
        });

        saveCart();
        renderCart();
        openCart();
      });
    }

    if (esVinil || esSublimada) {

      const customizeButton = document.createElement("button");
      customizeButton.className = "customize-btn";
      customizeButton.textContent = esVinil
        ? "Personalizar funda de vinil"
        : "Personalizar funda sublimada";

      button.after(customizeButton);

      customizeButton.addEventListener("click", () => {
        document.getElementById("vinylModal").classList.remove("hidden");

        const modalTitle = document.querySelector("#vinylModal h2");
        if (modalTitle) {
          modalTitle.textContent = esVinil
            ? "Personaliza tu funda de vinil"
            : "Personaliza tu funda sublimada";
        }
      });
    }

  });
}

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

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const order = {
    id: Date.now(),
    products: [...cart],
    total: total,
    paymentMethod: selectedPayment.value,
    status: "Pendiente de pago",
    date: new Date().toLocaleString("es-MX")
  };
 
  let orders = JSON.parse(
    localStorage.getItem("tecnoluxxeOrders") || "[]"
  );

  orders.push(order);

  localStorage.setItem(
    "tecnoluxxeOrders",
    JSON.stringify(orders)
  );

  cart = [];

  saveCart();
  renderCart();

  document.querySelectorAll(
    'input[name="paymentMethod"]'
  ).forEach(input => input.checked = false);

  alert(
    "¡Tu pedido se ha registrado correctamente!\n\n" +
    "Número de pedido: " + order.id +
    "\nTotal: $" + total + " MXN" +
    "\nMétodo de pago: " + order.paymentMethod
  );

  closeCart();

});
