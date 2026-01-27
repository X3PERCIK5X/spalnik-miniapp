// cart.js
// Рендер меню, корзины, подсчёт суммы и отправка предзаказа.

(function () {
  const MENU = window.SPALNIK_MENU || [];
  const TG = window.SPALNIK_TG;

  // DOM
  const categoriesEl = document.getElementById("categories");
  const menuEl = document.getElementById("menu");

  const cartButton = document.getElementById("cartButton");
  const cartCountEl = document.getElementById("cartCount");

  const cartScreen = document.getElementById("cartScreen");
  const closeCartBtn = document.getElementById("closeCart");
  const cartItemsEl = document.getElementById("cartItems");

  const phoneInput = document.getElementById("phoneInput");
  const timeInput = document.getElementById("timeInput");
  const commentInput = document.getElementById("commentInput");

  const totalPriceEl = document.getElementById("totalPrice");
  const sendOrderBtn = document.getElementById("sendOrder");
  const statusBox = document.getElementById("statusBox");

  // State
  let activeCategoryId = MENU[0]?.id || "";
  // cart: { itemId: qty }
  const cart = {};

  function show(msg) {
    if (TG && typeof TG.show === "function") TG.show(msg);
    else console.log(msg);
  }
  function setStatus(msg) {
    if (statusBox) statusBox.textContent = msg || "";
  }

  function findItem(itemId) {
    for (const c of MENU) {
      for (const it of c.items) {
        if (it.id === itemId) return it;
      }
    }
    return null;
  }

  function cartCount() {
    return Object.values(cart).reduce((a, b) => a + b, 0);
  }

  function cartTotal() {
    let total = 0;
    for (const [id, qty] of Object.entries(cart)) {
      const it = findItem(id);
      if (!it) continue;
      total += Number(it.price) * Number(qty);
    }
    return total;
  }

  function setQty(itemId, qty) {
    const q = Number(qty);
    if (q <= 0) delete cart[itemId];
    else cart[itemId] = q;
  }

  // ---------- Render Categories ----------
  function renderCategories() {
    categoriesEl.innerHTML = "";
    for (const c of MENU) {
      const b = document.createElement("div");
      b.className = "category" + (c.id === activeCategoryId ? " active" : "");
      b.textContent = c.title;
      b.onclick = () => {
        activeCategoryId = c.id;
        renderCategories();
        renderMenu();
      };
      categoriesEl.appendChild(b);
    }
  }

  // ---------- Render Menu ----------
  function renderMenu() {
    menuEl.innerHTML = "";

    const cat = MENU.find((c) => c.id === activeCategoryId);
    if (!cat) return;

    for (const it of cat.items) {
      const qty = cart[it.id] || 0;

      const card = document.createElement("div");
      card.className = "menu-item";

      const safeDesc = (it.desc || "").trim();
      const safeWeight = (it.weight || "").trim();

      card.innerHTML = `
        <div class="menu-title">${it.name}</div>
        ${safeDesc ? `<div class="menu-desc">${safeDesc}</div>` : ""}
        <div class="menu-bottom">
          <div>
            ${safeWeight ? `<div class="menu-weight">${safeWeight}</div>` : `<div class="menu-weight"></div>`}
            <div class="menu-price">${it.price} ₽</div>
          </div>

          <div class="controls">
            <button class="btnMinus" type="button">-</button>
            <span class="qty">${qty}</span>
            <button class="btnPlus" type="button">+</button>
          </div>
        </div>
      `;

      const minus = card.querySelector(".btnMinus");
      const plus = card.querySelector(".btnPlus");

      minus.onclick = () => {
        const current = cart[it.id] || 0;
        setQty(it.id, current - 1);
        updateAll();
      };

      plus.onclick = () => {
        const current = cart[it.id] || 0;
        setQty(it.id, current + 1);
        updateAll();
      };

      menuEl.appendChild(card);
    }
  }

  // ---------- Cart Screen ----------
  function openCart() {
    cartScreen.classList.remove("hidden");
    renderCart();
  }

  function closeCart() {
    cartScreen.classList.add("hidden");
  }

  function renderCart() {
    cartItemsEl.innerHTML = "";

    const ids = Object.keys(cart);

    if (ids.length === 0) {
      cartItemsEl.innerHTML = `
        <div class="menu-item">
          <div class="menu-title">Корзина пустая</div>
          <div class="menu-desc">Добавь позиции из меню</div>
        </div>`;
      totalPriceEl.textContent = "0";
      return;
    }

    for (const id of ids) {
      const it = findItem(id);
      if (!it) continue;

      const qty = cart[id];
      const sum = Number(it.price) * Number(qty);

      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <div class="cart-item-title">${it.name}</div>
        <div class="cart-item-sub">${it.price} ₽ × ${qty} = ${sum} ₽</div>
        <div style="margin-top:8px; display:flex; gap:8px;">
          <button class="btnMinus" type="button">-</button>
          <button class="btnPlus" type="button">+</button>
          <button class="btnRemove" type="button" style="margin-left:auto; opacity:0.8;">Удалить</button>
        </div>
      `;

      row.querySelector(".btnMinus").onclick = () => {
        setQty(id, (cart[id] || 0) - 1);
        updateAll();
        renderCart();
      };

      row.querySelector(".btnPlus").onclick = () => {
        setQty(id, (cart[id] || 0) + 1);
        updateAll();
        renderCart();
      };

      row.querySelector(".btnRemove").onclick = () => {
        delete cart[id];
        updateAll();
        renderCart();
      };

      cartItemsEl.appendChild(row);
    }

    totalPriceEl.textContent = String(cartTotal());
  }

  // ---------- Build payload ----------
  function buildPayload() {
    const items = [];

    for (const [id, qty] of Object.entries(cart)) {
      const it = findItem(id);
      if (!it) continue;
      items.push({
        id: it.id,
        name: it.name,
        price: it.price,
        qty: qty,
        sum: Number(it.price) * Number(qty),
      });
    }

    return {
      payload_version: 2,
      type: "preorder",
      phone: phoneInput.value.trim(),
      desired_time: timeInput.value.trim(),
      comment: commentInput.value.trim(),
      total: cartTotal(),
      items,
      created_at: new Date().toISOString(),
    };
  }

  function buildPayloadCompact() {
    const items = [];
    for (const [id, qty] of Object.entries(cart)) {
      items.push({ id, qty: Number(qty) });
    }
    return {
      payload_version: 2,
      compact: true,
      type: "preorder",
      phone: phoneInput.value.trim(),
      desired_time: timeInput.value.trim(),
      comment: commentInput.value.trim(),
      total: cartTotal(),
      items,
      created_at: new Date().toISOString(),
    };
  }

  function validate(payload) {
    if (!payload.phone) return "Укажи телефон для подтверждения.";
    if (!payload.desired_time) return "Укажи, к какому времени приготовить.";
    if (!payload.items || payload.items.length === 0) return "Корзина пустая.";
    return null;
  }

  // ---------- Send order ----------
  async function sendOrder() {
    let payload = buildPayload();
    const err = validate(payload);
    if (err) {
      show(err);
      setStatus(err);
      return;
    }

    show("⏳ Отправляю заказ...");
    let raw = JSON.stringify(payload);
    let compact = false;
    if (raw.length > 3500) {
      payload = buildPayloadCompact();
      raw = JSON.stringify(payload);
      compact = true;
    }
    if (raw.length > 3500) {
      const msg = "❌ Заказ слишком большой для отправки. Уменьши корзину.";
      show(msg);
      setStatus(msg);
      return;
    }

    setStatus(`⏳ Отправляю заказ... (payload ${raw.length} bytes${compact ? ", compact" : ""})`);
    if (sendOrderBtn) sendOrderBtn.disabled = true;

    if (!TG || typeof TG.sendOrder !== "function") {
      show("❌ Ошибка: telegram.js не подключился (SPALNIK_TG не найден).");
      setStatus("❌ Ошибка: telegram.js не подключился.");
      if (sendOrderBtn) sendOrderBtn.disabled = false;
      console.log("payload:", payload);
      return;
    }

    // API‑first: надёжный канал. sendData оставляем как фоллбэк.
    if (TG && typeof TG.sendOrderViaApi === "function" && TG.apiUrl) {
      const res = await TG.sendOrderViaApi(payload);
      if (!res.ok) {
        const msg = "❌ Не удалось отправить заказ через API.";
        show(msg);
        setStatus(msg);
        if (sendOrderBtn) sendOrderBtn.disabled = false;
        return;
      }
    } else if (TG && typeof TG.sendOrder === "function") {
      TG.sendOrder(payload);
    } else {
      const msg = "❌ Нет доступного канала отправки заказа.";
      show(msg);
      setStatus(msg);
      if (sendOrderBtn) sendOrderBtn.disabled = false;
      return;
    }

    setStatus("✅ Заказ отправлен. Подтверждение придёт сообщением в чате.");
    if (sendOrderBtn) sendOrderBtn.disabled = false;

    // очищаем корзину
    for (const k of Object.keys(cart)) delete cart[k];

    // очищаем комментарий, телефон/время оставляем
    commentInput.value = "";

    updateAll();
    renderCart();
  }

  // ---------- UI updates ----------
  function updateAll() {
    cartCountEl.textContent = String(cartCount());
    totalPriceEl.textContent = String(cartTotal());
    renderCategories();
    renderMenu();
  }

  // ---------- Events ----------
  cartButton.onclick = openCart;
  closeCartBtn.onclick = closeCart;
  sendOrderBtn.onclick = sendOrder;

  // ---------- Init ----------
  if (TG && TG.isTelegram) {
    if (!TG.hasInitData) {
      setStatus("⚠️ Открой Mini App через кнопку бота в группе и нажми «Отправить предзаказ».");
    } else {
      const chat = TG.initDataUnsafe?.chat || {};
      const chatType = chat.type || "unknown";
      const chatId = chat.id ? String(chat.id) : "unknown";
      const apiState = TG.apiUrl ? "on" : "off";
      setStatus(`✅ Telegram OK. chat_type=${chatType}, chat_id=${chatId}, api=${apiState}`);
    }
  }
  renderCategories();
  renderMenu();
  cartCountEl.textContent = "0";
  totalPriceEl.textContent = "0";
})();
