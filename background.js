let currentTabId = null;
let startTime = Date.now();

browser.runtime.onStartup.addListener(async () => {
    let data = await browser.storage.local.get();
    for (let key in data) {
        if (typeof data[key] === 'number') await browser.storage.local.remove(key);
    }
});

browser.tabs.onActivated.addListener(activeInfo => {
    currentTabId = activeInfo.tabId;
    startTime = Date.now();
});

browser.windows.onFocusChanged.addListener(async (windowId) => {
    if (windowId === browser.windows.WINDOW_ID_NONE) {
        currentTabId = null;
    } else {
        let tabs = await browser.tabs.query({active: true, currentWindow: true});
        if (tabs[0]) currentTabId = tabs[0].id;
        startTime = Date.now();
    }
});

setInterval(async () => {
    if (!currentTabId) return;
    try {
        let tab = await browser.tabs.get(currentTabId);
        if (tab.url && !tab.url.startsWith("about:") && !tab.url.startsWith("moz-")) {
            let domain = new URL(tab.url).hostname;
            let data = await browser.storage.local.get(domain);
            let existingTime = data[domain] || 0;
            let elapsed = Date.now() - startTime;
            await browser.storage.local.set({ [domain]: existingTime + elapsed });
            startTime = Date.now(); 
        }
    } catch (e) {}
}, 1000);