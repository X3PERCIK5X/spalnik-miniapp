// telegram.js
// Мост между Mini App и Telegram Bot через WebApp.sendData()

(function () {
  const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;

  function isInsideTelegram() {
    return !!tg;
  }

  function sendOrder(payload) {
    const json = JSON.stringify(payload);

    // Если открыто НЕ внутри Telegram — показываем сообщение (для теста в браузере)
    if (!isInsideTelegram()) {
      alert(
        "⚠️ Mini App открыт НЕ в Telegram.\n\n" +
          "Открой мини-апп через кнопку в боте — только тогда заказ уйдёт в Telegram."
      );
      console.log("ORDER PAYLOAD:", payload);
      return;
    }

    try {
      tg.ready();
      tg.sendData(json);
      // Можно закрыть мини-апп после отправки:
      // tg.close();
      alert("✅ Предзаказ отправлен!");
    } catch (e) {
      alert("❌ Ошибка отправки. Попробуй ещё раз.");
      console.error(e);
    }
  }

  // делаем глобальный объект, который вызывает cart.js
  window.SPALNIK_TG = {
    sendOrder,
    isInsideTelegram,
  };
})();
