console.log("✅ telegram.js loaded");
// telegram.js
(function () {
  const isTelegram = !!(window.Telegram && window.Telegram.WebApp);

  function show(msg) {
    if (isTelegram && Telegram.WebApp.showAlert) Telegram.WebApp.showAlert(msg);
    else alert(msg);
  }

  function sendOrder(payload) {
    if (!isTelegram) {
      show("❌ Mini App открыт не в Telegram.");
      return;
    }

    try {
      Telegram.WebApp.ready();
      Telegram.WebApp.sendData(JSON.stringify(payload));
      show("✅ Предзаказ отправлен!");
    } catch (e) {
      console.log(e);
      show("❌ Ошибка отправки. Проверь консоль/бота.");
    }
  }

  // Экспортируем API
  window.SPALNIK_TG = {
    isTelegram,
    show,
    sendOrder,
  };

  // Инициализация Telegram WebApp
  if (isTelegram) {
    Telegram.WebApp.ready();
    Telegram.WebApp.expand();
  }
})();
