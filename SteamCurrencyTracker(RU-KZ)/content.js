chrome.storage.local.get('extensionEnabled', function (data) {
    if (!data.extensionEnabled) {
        return; // Если расширение отключено, прекращаем выполнение
    }

// Получение ID приложения из URL страницы
const appIdMatch = window.location.pathname.match(/\/app\/(\d+)/);

if (appIdMatch) {
  const appId = appIdMatch[1];

  // Поиск элемента с названием игры
  const appNameElement = document.getElementById('appHubAppName');
  if (appNameElement) {
    // Создание кнопки
    const steamDBLink = `https://steamdb.info/app/${appId}/?cc=ru`;
    const button = document.createElement('a');
    button.href = steamDBLink;
    button.target = '_blank';
    button.rel = 'noopener noreferrer'; // Безопасность и производительность
    button.innerText = 'Посмотреть на SteamDB';

    // Стилизация кнопки
    button.style.display = 'inline-block';
    button.style.margin = '10px 0';         // Отступы сверху и снизу
    button.style.padding = '10px 15px';     // Внутренние отступы (padding)
    button.style.backgroundColor = '#555';  // Приятный серый цвет
    button.style.color = 'white';           // Белый текст
    button.style.borderRadius = '5px';      // Скругленные углы
    button.style.textDecoration = 'none';   // Убираем подчеркивание
    button.style.fontSize = '16px';         // Увеличенный размер шрифта
    button.style.fontWeight = 'bold';       // Жирный шрифт
    button.style.textAlign = 'center';      // Выравнивание текста по центру
    button.style.cursor = 'pointer';        // Курсор в виде руки при наведении

    // Вставка кнопки рядом с названием игры
    appNameElement.parentElement.appendChild(button);
  }
}
});