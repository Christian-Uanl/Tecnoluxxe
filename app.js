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


const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");

let cart = JSON.parse(localStorage.getItem("tecnoluxxeCart") || "[]");

function renderProducts(list) {
  if (!productsGrid) return;

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
      : `<span style="font-size:5rem;">${product.icon}</span>`;

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

async function loadProducts() {
  const { data, error } = await supabaseClient
    .from("productos")
    .select("id_producto, nombre, precio_base, imagen, activo")
    .eq("activo", true);

  if (error) {
    console.error("Error al cargar productos:", error);
    return;
  }

  products = data.map(product => ({
    id: product.id_producto,
    name: product.nombre,
    category: "Productos",
    price: Number(product.precio_base),
    icon: product.imagen || "📦"
  }));

  renderProducts(products);
}

loadProducts();

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(value) ||
      product.category.toLowerCase().includes(value)
    );

    renderProducts(filtered);
  });
}

document.querySelectorAll("[data-category]").forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;

    renderProducts(
      products.filter(product => product.category === category)
    );

    document.getElementById("productos")?.scrollIntoView();
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

function renderCart() {
  if (!cartItems) return;

  cart.forEach(item => {
    if (!item.cartItemId) {
      item.cartItemId = Date.now() + Math.random();
    }

    if (!item.quantity) {
      item.quantity = 1;
    }
  });

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );

  if (cartCount) cartCount.textContent = totalItems;
  if (cartTotal) cartTotal.textContent = `$${totalPrice} MXN`;

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
          <p>${item.customization || ""}</p>
          <p>$${item.price} MXN c/u</p>

          <div class="cart-controls">
            <button onclick="changeQuantity(${item.cartItemId}, -1)">−</button>

            <strong>${item.quantity}</strong>

            <button onclick="changeQuantity(${item.cartItemId}, 1)">+</button>
          </div>
        </div>

        <button
          class="remove-item"
          onclick="removeFromCart(${item.cartItemId})"
          title="Eliminar">
          🗑️
        </button>

      </div>
    `;
  }).join("");

  saveCart();
}

function changeQuantity(cartItemId, amount) {
  const item = cart.find(product =>
    product.cartItemId === cartItemId
  );

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(product =>
      product.cartItemId !== cartItemId
    );
  }

  saveCart();
  renderCart();
}

function removeFromCart(cartItemId) {
  cart = cart.filter(product =>
    product.cartItemId !== cartItemId
  );

  saveCart();
  renderCart();
}

function openCart() {
  cartPanel?.classList.remove("hidden");
  cartOverlay?.classList.remove("hidden");
}

function closeCart() {
  cartPanel?.classList.add("hidden");
  cartOverlay?.classList.add("hidden");
}

cartOpen?.addEventListener("click", openCart);
cartClose?.addEventListener("click", closeCart);
cartOverlay?.addEventListener("click", closeCart);

clearCartBtn?.addEventListener("click", () => {
  if (!cart.length) return;

  if (confirm("¿Quieres vaciar todo el carrito?")) {
    cart = [];
    saveCart();
    renderCart();
  }
});

const customizeModal = document.getElementById("customizeModal");
const customTitle = document.getElementById("customTitle");
const customFields = document.getElementById("customFields");
const customClose = document.getElementById("customClose");
const confirmCustomize = document.getElementById("confirmCustomize");

let selectedProduct = null;

const whatsappNumber = "528118246564";

function contactWhatsApp() {
  if (!selectedProduct) return;

  const design = document.getElementById("customDesign")?.value.trim() || "";

  const message = `
Hola, me interesa personalizar una ${selectedProduct.name} de Tecnoluxxe.

Mi idea o diseño es:
${design || "Quisiera recibir asesoría para elegir un diseño."}

¿Me podrían ayudar con información y opciones disponibles?
  `.trim();

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}



function openCustomize(productId) {
  selectedProduct = products.find(p => p.id === productId);

  if (!selectedProduct) return;

  if (!customizeModal || !customFields || !customTitle) {
    alert("No se encontró la ventana de personalización en el HTML.");
    return;
  }

  customTitle.textContent = `Personaliza: ${selectedProduct.name}`;
  customFields.innerHTML = "";

  const name = selectedProduct.name.toLowerCase();

  if (
    name.includes("funda") &&
    !name.includes("vinil") &&
    !name.includes("sublimada")
  ) {

    if (name.includes("ipad")) {

      customFields.innerHTML = `
        <label>Modelo de iPad:</label>
        <select id="customModel">
          <option value="">Selecciona un modelo</option>
          <option>iPad 9ª generación</option>
          <option>iPad 10ª generación</option>
          <option>iPad Air</option>
          <option>iPad Air M2</option>
          <option>iPad Air M3</option>
          <option>iPad Pro 11 pulgadas</option>
          <option>iPad Pro 12.9 pulgadas</option>
          <option>iPad Pro 13 pulgadas</option>
          <option>Otro modelo</option>
        </select>
      `;

    } else if (name.includes("airpods")) {

      customFields.innerHTML = `
        <label>Modelo de AirPods:</label>
        <select id="customModel">
          <option value="">Selecciona un modelo</option>
          <option>AirPods 1ª generación</option>
          <option>AirPods 2ª generación</option>
          <option>AirPods 3ª generación</option>
          <option>AirPods 4ª generación</option>
          <option>AirPods Pro</option>
          <option>AirPods Pro 2ª generación</option>
          <option>Otro modelo</option>
        </select>
      `;

    } else {

      customFields.innerHTML = `
        <label>Marca del dispositivo:</label>
        <select id="customBrand">
          <option value="">Selecciona una marca</option>
          ${Object.keys(catalogoModelos).map(marca =>
            `<option value="${marca}">${marca}</option>`
          ).join("")}
        </select>

        <label>Modelo:</label>
        <select id="customModel" disabled>
          <option value="">Primero selecciona una marca</option>
        </select>
      `;

      document.getElementById("customBrand")
        .addEventListener("change", event => {
          const modelos = catalogoModelos[event.target.value] || [];
          const modelSelect = document.getElementById("customModel");

          modelSelect.innerHTML = `
            <option value="">Selecciona un modelo</option>
            ${modelos.map(modelo =>
              `<option value="${modelo}">${modelo}</option>`
            ).join("")}
          `;

          modelSelect.disabled = !modelos.length;
        });
    }

    customFields.innerHTML += `
      <label>Color:</label>
      <select id="customColor">
        <option value="">Selecciona un color</option>
        ${catalogoColores.map(color =>
          `<option value="${color}">${color}</option>`
        ).join("")}
      </select>
    `;

  } else if (name.includes("vinil") || name.includes("sublimada")) {

    customFields.innerHTML = `
      <label>Describe el diseño que deseas:</label>

      <textarea
        id="customDesign"
        placeholder="Escribe los detalles de tu diseño">
      </textarea>

      <p class="whatsapp-info">
        ¿Necesitas ayuda con tu diseño o quieres enviar una imagen de referencia?
        Contáctanos por WhatsApp.
      </p>

      <button
        type="button"
        id="whatsappCustomizeBtn"
        class="whatsapp-customize-btn">
        Contactar por WhatsApp
      </button>
    `;

    document.getElementById("whatsappCustomizeBtn")
      .addEventListener("click", contactWhatsApp);

  } else if (name.includes("mica")) {

    customFields.innerHTML = `
      <label>Marca del dispositivo:</label>
      <select id="customBrand">
        <option value="">Selecciona una marca</option>
        ${Object.keys(catalogoModelos).map(marca =>
          `<option value="${marca}">${marca}</option>`
        ).join("")}
      </select>

      <label>Modelo:</label>
      <select id="customModel" disabled>
        <option value="">Primero selecciona una marca</option>
      </select>
    `;

    document.getElementById("customBrand")
      .addEventListener("change", event => {
        const modelos = catalogoModelos[event.target.value] || [];
        const modelSelect = document.getElementById("customModel");

        modelSelect.innerHTML = `
          <option value="">Selecciona un modelo</option>
          ${modelos.map(modelo =>
            `<option value="${modelo}">${modelo}</option>`
          ).join("")}
        `;

        modelSelect.disabled = !modelos.length;
      });

  } else if (name.includes("cargador")) {

    customFields.innerHTML = `
      <label>Modelo del dispositivo:</label>
      <input
        type="text"
        id="customModel"
        placeholder="Ej. iPhone 15, Samsung A54...">
    `;

  } else {

    customFields.innerHTML = `
      <p>Este producto no requiere personalización.</p>
    `;
  }

  customizeModal.classList.remove("hidden");
}


customClose?.addEventListener("click", () => {
  customizeModal.classList.add("hidden");
});

customizeModal?.addEventListener("click", event => {
  if (event.target === customizeModal) {
    customizeModal.classList.add("hidden");
  }
});

confirmCustomize?.addEventListener("click", () => {
  if (!selectedProduct) return;

  const name = selectedProduct.name.toLowerCase();
  let customization = [];

  if (
    name.includes("funda") &&
    !name.includes("vinil") &&
    !name.includes("sublimada")
  ) {
    const model = document.getElementById("customModel")?.value;
    const color = document.getElementById("customColor")?.value;
    const brand = document.getElementById("customBrand")?.value;

    if (!model || !color) {
      alert("Selecciona el modelo y el color.");
      return;
    }

    if (document.getElementById("customBrand") && !brand) {
      alert("Selecciona la marca del dispositivo.");
      return;
    }

    customization = [
      ...(brand ? [`Marca: ${brand}`] : []),
      `Modelo: ${model}`,
      `Color: ${color}`
    ];

  } else if (name.includes("vinil") || name.includes("sublimada")) {
    const design = document.getElementById("customDesign").value.trim();

    if (!design) {
      alert("Describe el diseño que deseas.");
      return;
    }

    customization = [`Diseño: ${design}`];

  } else if (name.includes("mica")) {
    const brand = document.getElementById("customBrand").value;
    const model = document.getElementById("customModel").value;

    if (!brand || !model) {
      alert("Selecciona la marca y el modelo.");
      return;
    }

    customization = [
      `Marca: ${brand}`,
      `Modelo: ${model}`
    ];

  } else if (name.includes("cargador")) {
    const model = document.getElementById("customModel").value.trim();

    if (!model) {
      alert("Escribe el modelo de tu dispositivo.");
      return;
    }

    customization = [`Modelo: ${model}`];
  }

  cart.push({
    ...selectedProduct,
    cartItemId: Date.now() + Math.random(),
    quantity: 1,
    customization: customization.join(" | ")
  });

  saveCart();
  renderCart();

  customizeModal.classList.add("hidden");
  selectedProduct = null;

  openCart();
});

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {

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
}

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn?.addEventListener("click", () => {
  nav?.classList.toggle("open");
});

const loginModal = document.getElementById("loginModal");
const loginOpen = document.getElementById("loginOpen");
const loginClose = document.getElementById("loginClose");
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginOpen?.addEventListener("click", () => {
  loginModal?.classList.remove("hidden");
});

loginClose?.addEventListener("click", () => {
  loginModal?.classList.add("hidden");
});

loginForm?.addEventListener("submit", event => {
  event.preventDefault();

  const email = document.getElementById("email")?.value;

  if (loginMessage) {
    loginMessage.textContent =
      `Sesión de prueba iniciada con ${email}`;
  }
});

const chatOpen = document.getElementById("chatOpen");
const chatClose = document.getElementById("chatClose");
const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

chatOpen?.addEventListener("click", () => {
  chatBox?.classList.remove("hidden");
});

chatClose?.addEventListener("click", () => {
  chatBox?.classList.add("hidden");
});

chatForm?.addEventListener("submit", event => {
  event.preventDefault();

  const message = chatInput?.value.trim();

  if (!message || !chatMessages) return;

  const userMessage = document.createElement("div");
  userMessage.className = "user-msg";
  userMessage.textContent = message;

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

renderCart();
