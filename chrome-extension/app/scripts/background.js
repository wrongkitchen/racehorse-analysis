'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.tabs.onUpdated.addListener(function (tabId) {
  chrome.pageAction.show(tabId);
});

chrome.browserAction.onClicked.addListener(function(tab) {
	// No tabs or host permissions needed!
	chrome.tabs.executeScript({
		code: 'twoFiveSon()'
	});
});

console.log('\'Allo \'Allo! Event Page for Page Action');
