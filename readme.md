# TempleOSRS.com (Tab Reloader Chrome Extension)

This Chrome extension provides a background script (`background.js`) that monitors and reloads tabs under specific conditions. The primary purpose is to refresh tabs with URLs containing "templeosrs.com" at regular intervals.

## Features

- **Automatic Tab Reloading:** Tabs with URLs matching "templeosrs.com" are automatically reloaded at a configurable interval (default: 5 minutes).

- **Event Handling:** The script efficiently handles tab updates, activations, and removals to ensure accurate and timely reloading.

## Configuration

Adjust the `reloadInterval` variable in the script to set the desired time interval for tab reloads.

# Usage
Download or clone this repository.

Open Google Chrome.

Navigate to chrome://extensions/.

Enable "Developer mode" in the top right corner.

Click "Load unpacked" and select the directory where the extension files are located.

The extension is now active. Open tabs with URLs containing "templeosrs.com" will be periodically reloaded.

# Notes
Tabs are reloaded only if their URL includes "templeosrs.com."

The extension uses timeouts to schedule reloads, and it clears them when tabs are closed or deactivated.

Customize the code as needed for your  specific use case.

# Code explanation
- Configuration:
    - `reloadInterval`: It sets the time interval (in milliseconds) for tab reloads. In this case, it's set to 5 minutes (5 * 60 * 1000 milliseconds).
- Variables:
    - `timeouts`: An object to store timeout IDs for each tab. This is used to keep track of when the next reload is scheduled for each tab.
- Functions:
    - `reloadIfMatched(tab)`: Reloads the tab if its URL includes `"templeosrs.com"`.
    - `setupTimeout(tabId)`: Sets up a timeout for a tab. After the specified `reloadInterval`, it checks if the tab's URL matches the condition and reloads it if necessary.
    - `clearTimeoutForTab(tabId)`: Clears the timeout for a specific tab. This is useful when a tab is closed or the user switches to a different tab.
- Event Listeners:
    - `chrome.tabs.onUpdated`: Listens for updates to tabs. When a tab is updated and its status becomes "complete" (indicating the page has finished loading), it clears the existing timeout for that tab and sets up a new one.
    - `chrome.tabs.onActivated`: Listens for when a tab is activated (selected by the user). It clears the existing timeout for that tab and sets up a new one.
    - `chrome.tabs.onRemoved`: Listens for when a tab is closed. It clears the timeout for the closed tab.