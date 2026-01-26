// telegram.js
// Отправка заказа из Mini App в бота через Telegram.WebApp.sendData()

(function () {
  const tg = (window.Telegram && window.Telegram.WebApp) ? window.Telegram.WebApp : null;

  function isInsideTelegram() {
    return !!tg;
  }

  function sendOrder(payload) {
    // На всякий случай убедимся, что payload сериализуется
    let json = "";
    try {
      json = JSON.stringify(payload);
    } catch (e) {
      alert("❌ Ошибка: не удалось сформировать данные заказа.");
      console.error(e);
      return;
    }

    // Если открыто в браузере — Telegram API нет
    if (!isInsideTelegram()) {
      alert(
        "⚠️ Мини-апп открыт НЕ в Telegram.\n\n" +
        "Открой его через кнопку в боте — только тогда заказ уйдёт в Telegram.\n\n" +
        "Я сохраню заказ в консоль."
      );
      console.log("ORDER PAYLOAD:", payload);
      return;
    }

    try {
      tg.ready();
      tg.sendData(json);
      // tg.close(); // если хочешь закрывать после отправки — раскомментируй
      alert("✅ Предзаказ отправлен!");
    } catch (e) {
      alert("❌ Ошибка отправки. Попробуй ещё раз.");
      console.error(e);
    }
  }

  // Глобальный мост, который вызывает cart.js
  window.SPALNIK_TG = { sendOrder, isInsideTelegram };
})();
