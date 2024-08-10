// content.js

// Проверяем, включено ли расширение
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
            // Создание контейнера для Shadow DOM
            const shadowHost = document.createElement('div');
            shadowHost.style.display = 'inline-block'; // Делаем элемент видимым
            appNameElement.parentElement.appendChild(shadowHost);

            // Создание Shadow DOM
            const shadowRoot = shadowHost.attachShadow({ mode: 'open' });

            // Добавляем стили в Shadow DOM
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = chrome.runtime.getURL('content.css'); // Путь к вашему CSS файлу
            shadowRoot.appendChild(link);

            // Создание кнопки
            const steamDBLink = `https://steamdb.info/app/${appId}/?cc=ru`;
            const button = document.createElement('a');
            button.href = steamDBLink;
            button.target = '_blank';
            button.rel = 'noopener noreferrer'; // Безопасность и производительность
            button.innerText = 'Посмотреть на SteamDB';
            button.className = 'custom-button'; // Применение класса стиля

            // Вставка кнопки в Shadow DOM
            shadowRoot.appendChild(button);
        }
    }
});
