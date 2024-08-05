document.addEventListener('DOMContentLoaded', function () {
    const toggleSwitch = document.getElementById('toggle');
    const statusText = document.getElementById('status');

    // Получаем текущее состояние расширения из Chrome Storage API
    chrome.storage.local.get('extensionEnabled', function (data) {
        toggleSwitch.checked = data.extensionEnabled;
        statusText.textContent = data.extensionEnabled ? 'Extension is ON' : 'Extension is OFF';
    });

    // Обрабатываем изменение состояния переключателя
    toggleSwitch.addEventListener('change', function () {
        const newState = toggleSwitch.checked;

        // Сохраняем новое состояние
        chrome.storage.local.set({ extensionEnabled: newState }, function () {
            statusText.textContent = newState ? 'Extension is ON' : 'Extension is OFF';
        });
    });
});
