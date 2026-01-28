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
  const cartFab = document.getElementById("cartFab");
  const cartFabCount = document.getElementById("cartFabCount");
  const cartFabTotal = document.getElementById("cartFabTotal");

  const cartScreen = document.getElementById("cartScreen");
  const closeCartBtn = document.getElementById("closeCart");
  const cartItemsEl = document.getElementById("cartItems");

  const phoneInput = document.getElementById("phoneInput");
  const timeInput = document.getElementById("timeInput");
  const commentInput = document.getElementById("commentInput");
  const tgProfileEl = document.getElementById("tgProfile");

  const tabMenu = document.getElementById("tabMenu");
  const tabBooking = document.getElementById("tabBooking");
  const menuSection = document.getElementById("menuSection");
  const bookingSection = document.getElementById("bookingSection");

  const bookingName = document.getElementById("bookingName");
  const bookingPhone = document.getElementById("bookingPhone");
  const bookingDate = document.getElementById("bookingDate");
  const bookingTime = document.getElementById("bookingTime");
  const bookingGuests = document.getElementById("bookingGuests");
  const bookingComment = document.getElementById("bookingComment");
  const bookingStatus = document.getElementById("bookingStatus");
  const bookingSend = document.getElementById("bookingSend");

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
  function setBookingStatus(msg) {
    if (bookingStatus) bookingStatus.textContent = msg || "";
  }

  function setActiveTab(name) {
    if (!tabMenu || !tabBooking || !menuSection || !bookingSection) return;
    const isMenu = name === "menu";
    tabMenu.classList.toggle("active", isMenu);
    tabBooking.classList.toggle("active", !isMenu);
    menuSection.classList.toggle("hidden", !isMenu);
    bookingSection.classList.toggle("hidden", isMenu);
  }

  function saveProfile(name, phone) {
    if (name) localStorage.setItem("spalnik_name", name);
    if (phone) localStorage.setItem("spalnik_phone", phone);
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
        const section = document.getElementById(`cat-${c.id}`);
        if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      categoriesEl.appendChild(b);
    }
  }

  // ---------- Render Menu ----------
  function renderMenu() {
    menuEl.innerHTML = "";
    for (const cat of MENU) {
      const section = document.createElement("section");
      section.id = `cat-${cat.id}`;

      const title = document.createElement("div");
      title.className = "category-title";
      title.textContent = cat.title;
      section.appendChild(title);

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

        section.appendChild(card);
      }

      menuEl.appendChild(section);
    }
  }

  // ---------- Cart Screen ----------
  function openCart() {
    cartScreen.classList.remove("hidden");
    if (cartFab) cartFab.classList.add("hidden");
    renderCart();
  }

  function closeCart() {
    cartScreen.classList.add("hidden");
    updateAll();
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
    const tgUser = TG?.initDataUnsafe?.user || null;
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
      tg: tgUser
        ? {
            id: tgUser.id,
            username: tgUser.username || "",
            first_name: tgUser.first_name || "",
            last_name: tgUser.last_name || "",
          }
        : null,
      phone: phoneInput.value.trim(),
      desired_time: timeInput.value.trim(),
      comment: commentInput.value.trim(),
      total: cartTotal(),
      items,
      created_at: new Date().toISOString(),
    };
  }

  function buildPayloadCompact() {
    const tgUser = TG?.initDataUnsafe?.user || null;
    const items = [];
    for (const [id, qty] of Object.entries(cart)) {
      items.push({ id, qty: Number(qty) });
    }
    return {
      payload_version: 2,
      compact: true,
      type: "preorder",
      tg: tgUser
        ? {
            id: tgUser.id,
            username: tgUser.username || "",
            first_name: tgUser.first_name || "",
            last_name: tgUser.last_name || "",
          }
        : null,
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

    setStatus("⏳ Отправляю заказ...");
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
        const detail = res.error ? ` (${res.error})` : "";
        const msg = `❌ Не удалось отправить заказ через API.${detail}`;
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

    setStatus("✅ Заказ оформлен. Ожидайте звонка для подтверждения.");
    saveProfile("", phoneInput.value.trim());
    if (sendOrderBtn) sendOrderBtn.disabled = false;

    // очищаем корзину
    for (const k of Object.keys(cart)) delete cart[k];

    // очищаем комментарий, телефон/время оставляем
    commentInput.value = "";

    updateAll();
    renderCart();
  }

  async function sendBooking() {
    if (!TG || typeof TG.sendOrderViaApi !== "function" || !TG.apiUrl) {
      setBookingStatus("❌ Канал брони не настроен.");
      return;
    }

    const payload = {
      type: "booking",
      tg: TG?.initDataUnsafe?.user
        ? {
            id: TG.initDataUnsafe.user.id,
            username: TG.initDataUnsafe.user.username || "",
            first_name: TG.initDataUnsafe.user.first_name || "",
            last_name: TG.initDataUnsafe.user.last_name || "",
          }
        : null,
      name: bookingName.value.trim(),
      phone: bookingPhone.value.trim(),
      date: bookingDate.value.trim(),
      time: bookingTime.value.trim(),
      guests: bookingGuests.value.trim(),
      comment: bookingComment.value.trim(),
      created_at: new Date().toISOString(),
    };

    if (!payload.name || !payload.phone || !payload.date || !payload.time || !payload.guests) {
      setBookingStatus("❌ Заполни имя, телефон, дату, время и гостей.");
      return;
    }

    setBookingStatus("⏳ Отправляю бронь...");
    const res = await TG.sendOrderViaApi(payload);
    if (!res.ok) {
      setBookingStatus("❌ Не удалось отправить бронь.");
      return;
    }

    setBookingStatus("✅ Бронь отправлена. Мы свяжемся с вами.");
    saveProfile(payload.name, payload.phone);

    // Отправляем копию в бота для напоминаний
    if (TG && typeof TG.sendDataOnly === "function") {
      TG.sendDataOnly(payload);
    }
  }

  // ---------- UI updates ----------
  function updateAll() {
    const count = cartCount();
    const total = cartTotal();
    cartCountEl.textContent = String(count);
    totalPriceEl.textContent = String(total);
    renderCategories();
    renderMenu();

    if (cartFab && cartFabCount && cartFabTotal) {
      cartFabCount.textContent = String(count);
      cartFabTotal.textContent = String(total);
      if (count > 0 && cartScreen.classList.contains("hidden")) {
        cartFab.classList.remove("hidden");
      } else {
        cartFab.classList.add("hidden");
      }
    }
  }

  // ---------- Events ----------
  cartButton.onclick = openCart;
  if (cartFab) cartFab.onclick = openCart;
  closeCartBtn.onclick = closeCart;
  sendOrderBtn.onclick = sendOrder;
  if (tabMenu) tabMenu.onclick = () => setActiveTab("menu");
  if (tabBooking) tabBooking.onclick = () => setActiveTab("booking");
  if (bookingSend) bookingSend.onclick = sendBooking;

  // Скрывать клавиатуру при тапе в пустое место
  document.addEventListener("touchstart", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    if (t.closest("input, textarea, button")) return;
    const active = document.activeElement;
    if (active && active instanceof HTMLElement) active.blur();
  });

  // ---------- Init ----------
  // Без технических статусов при старте
  if (tgProfileEl) {
    const u = TG?.initDataUnsafe?.user;
    if (u) {
      const name = [u.first_name, u.last_name].filter(Boolean).join(" ").trim();
      const username = u.username ? `@${u.username}` : "";
      tgProfileEl.textContent = [name, username].filter(Boolean).join(" ");
    } else {
      tgProfileEl.textContent = "—";
    }
  }
  if (phoneInput) {
    const savedPhone = localStorage.getItem("spalnik_phone") || "";
    if (!phoneInput.value) phoneInput.value = savedPhone;
  }
  if (bookingName) {
    const savedName = localStorage.getItem("spalnik_name") || "";
    if (!bookingName.value) bookingName.value = savedName;
  }
  if (bookingPhone) {
    const savedPhone = localStorage.getItem("spalnik_phone") || "";
    if (!bookingPhone.value) bookingPhone.value = savedPhone;
  }
  setActiveTab("menu");
  renderCategories();
  renderMenu();
  cartCountEl.textContent = "0";
  totalPriceEl.textContent = "0";
})();
