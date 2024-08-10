document.addEventListener('DOMContentLoaded', function () {
    const toggleSwitch = document.getElementById('toggle');
    const statusText = document.getElementById('status');

    // Получаем текущее состояние расширения из Chrome Storage API
    chrome.storage.local.get('extensionEnabled', function (data) {
        toggleSwitch.checked = data.extensionEnabled || false;
        statusText.textContent = toggleSwitch.checked ? 'Extension is ON' : 'Extension is OFF';
    });

    // Обрабатываем изменение состояния переключателя
    toggleSwitch.addEventListener('change', function () {
        const newState = toggleSwitch.checked;

        // Сохраняем новое состояние
        chrome.storage.local.set({ extensionEnabled: newState }, function () {
            statusText.textContent = newState ? 'Extension is ON' : 'Extension is OFF';

            // Отправляем сообщение background.js о смене состояния
            chrome.runtime.sendMessage({ action: newState ? 'enable' : 'disable' });
        });
    });
});
