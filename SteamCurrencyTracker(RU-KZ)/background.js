chrome.runtime.onMessage.addListener(function (message){
    if (message.action === 'enable') {
        // Включаем контент-скрипты
        chrome.scripting.executeScript({
            target: { allFrames: true },
            files: ['content.js', 'steamdb.js']
        });
    } else if (message.action === 'disable') {
        // Удаляем контент-скрипты, если они уже загружены
        chrome.scripting.removeScript({
            target: { allFrames: true },
            files: ['content.js', 'steamdb.js']
        });
    }
});
