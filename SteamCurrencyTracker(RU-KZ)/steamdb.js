chrome.storage.local.get('extensionEnabled', function (data) {
    if (!data.extensionEnabled) {
        return; // Если расширение отключено, прекращаем выполнение
    }

// Функция для модификации таблицы на странице
function modifyTable() {
  const priceTable = document.querySelector('.table.table-fixed.table-prices');

  if (priceTable) {
    const rows = priceTable.querySelectorAll('tr');

    rows.forEach((row) => {
      const isCurrentPriceRow = row.classList.contains('table-prices-current');
      const priceCell = row.querySelector('.price-line[data-cc="kz"]');

      // Удаляем строки, если они не содержат цену в тенге
      if (!isCurrentPriceRow && !priceCell) {
        row.remove();
      }
    });
  }
}

// Функция для удаления параметров и хэша перед закрытием страницы
function cleanUpURL() {
  if (window.location.hash.includes('params-added')) {
    history.replaceState(null, null, window.location.pathname);
  }
}

// Оптимизированное использование MutationObserver
const observer = new MutationObserver(() => {
  const priceTable = document.querySelector('.table.table-fixed.table-prices');
  if (priceTable) {
    modifyTable();
    observer.disconnect(); // Останавливаем наблюдение после первой модификации
  }
});

// Начинаем наблюдение за изменениями в DOM
observer.observe(document.body, { childList: true, subtree: true });
});