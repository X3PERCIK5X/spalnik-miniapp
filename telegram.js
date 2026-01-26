// telegram.js
// Единая функция отправки заказа в Telegram через Mini App API.

(function () {
  const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;

  window.SPALNIK_TG = {
    tg,

    init() {
      if (tg) {
        tg.ready();
        tg.expand();
      }
    },

    sendOrder(payload) {
      // В Telegram: отправляем в бота через sendData()
      if (tg) {
        tg.sendData(JSON.stringify(payload));
        tg.showAlert("✅ Предзаказ отправлен! Мы скоро свяжемся для подтверждения.");
        // Можно закрывать мини-апп после отправки:
        // tg.close();
        return true;
      }

      // В браузере (проверка): покажем payload
      alert("Открывай мини-апп через Telegram.\n\nPayload:\n" + JSON.stringify(payload, null, 2));
      return false;
    },
  };

  window.SPALNIK_TG.init();
})();
