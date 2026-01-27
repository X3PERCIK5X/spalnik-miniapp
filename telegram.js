console.log("✅ telegram.js loaded");
// telegram.js
(function () {
  const isTelegram = !!(window.Telegram && window.Telegram.WebApp);
  const initData = isTelegram ? (Telegram.WebApp.initData || "") : "";
  const initDataUnsafe = isTelegram ? (Telegram.WebApp.initDataUnsafe || {}) : {};
  const hasInitData = Boolean(initData && initData.length > 0);

  function show(msg) {
    if (isTelegram && Telegram.WebApp.showAlert) Telegram.WebApp.showAlert(msg);
    else alert(msg);
  }

  function sendOrder(payload) {
    if (!isTelegram) {
      show("❌ Mini App открыт не в Telegram.");
      return;
    }
    if (!hasInitData) {
      show("❌ Mini App открыт не через кнопку бота. Открой из чата и попробуй снова.");
      return;
    }

    try {
      Telegram.WebApp.ready();
      Telegram.WebApp.showAlert("⏳ Отправляю заказ...");
      Telegram.WebApp.sendData(JSON.stringify(payload));
      show("✅ Предзаказ отправлен! Подтверждение придёт сообщением в чате.");
    } catch (e) {
      console.log(e);
      show("❌ Ошибка отправки. Проверь консоль/бота.");
    }
  }

  // Экспортируем API
  window.SPALNIK_TG = {
    isTelegram,
    initData,
    initDataUnsafe,
    hasInitData,
    show,
    sendOrder,
  };

  // Инициализация Telegram WebApp
  if (isTelegram) {
    Telegram.WebApp.ready();
    Telegram.WebApp.expand();
  }
})();
