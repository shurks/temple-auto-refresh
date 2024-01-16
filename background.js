// background.js
const reloadInterval = 5 * 60 * 1000; // 5 minutes in milliseconds
let timeouts = {};

function reloadIfMatched(tab) {
    if (tab.url.includes("templeosrs.com")) {
        chrome.tabs.reload(tab.id);
    }
}

function setupTimeout(tabId) {
    timeouts[tabId] = setTimeout(() => {
        chrome.tabs.get(tabId, (tab) => {
            reloadIfMatched(tab);
        });
    }, reloadInterval);
}

function clearTimeoutForTab(tabId) {
    if (timeouts[tabId]) {
        clearTimeout(timeouts[tabId]);
        delete timeouts[tabId];
    }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        clearTimeoutForTab(tabId);
        setupTimeout(tabId);
    }
});

chrome.tabs.onActivated.addListener(({ tabId }) => {
    clearTimeoutForTab(tabId);
    setupTimeout(tabId);
});

chrome.tabs.onRemoved.addListener((tabId) => {
    clearTimeoutForTab(tabId);
});
