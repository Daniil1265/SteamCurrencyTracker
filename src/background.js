chrome.runtime.onMessage.addListener(function (message) {
    // Фильтруем вкладки и обрабатываем только те, которые соответствуют указанным страницам
    chrome.tabs.query({}, function(tabs) {
        tabs.forEach(tab => {
            // Проверяем, соответствует ли URL вкладки страницам, указанным в manifest.json
            if (tab.url.includes("store.steampowered.com/app") ||
                (tab.url.includes("steamdb.info/app/") && tab.url.includes("?cc=ru")) ||
                tab.url.includes("steamdb.info/sub/")) {

                if (message.action === 'enable') {
                    // Включаем контент-скрипты
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id, allFrames: true },
                        files: ['content.js', 'steamdb.js']
                    }, function() {
                        chrome.tabs.reload(tab.id); // Перезагружаем только нужные вкладки
                    });
                } else if (message.action === 'disable') {
                    // Перезагружаем только нужные вкладки при отключении расширения
                    chrome.tabs.reload(tab.id);
                }
            }
        });
    });
});
