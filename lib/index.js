'use strict';
var storage = require('./core/storage');
var $ = require('jquery');
var plugins = require('./core/plugins');
var handleOnPage;

// make sure storage works
if (!storage.test()) {
	console.warn('Github Enhancement Suite cannot use localStorage' +
			'and may not work properly.');
}

// make sure our plugins are enabled by default
plugins.pluginNames.forEach(function (plugin) {
	if (typeof storage.get('enabled.' + plugin) !== 'boolean') {
		storage.set('enabled.' + plugin, true);
	}
});

// loop through each plugin calling onPage() if it's enabled and the enabledSelector matches
handleOnPage = function () {
	plugins.pluginNames.forEach(function (plugin) {
		if (storage.get('enabled.' + plugin) &&
			$(plugins[plugin].enabledSelector).length &&
			typeof plugins[plugin].onPage === 'function') {
			console.log('Firing onPage() for plugin: ' + plugin + ' at ' + Date.now());
			plugins[plugin].onPage();
		}
	});
};

// handle regular page loads
handleOnPage();

// handle pjax pages
(function () {
	var pjaxActive = false;
	var observer = new MutationObserver(function (mutations) {
		if ($('.pjax-active').length) {
			pjaxActive = true;
		} else if (pjaxActive) {
			pjaxActive = false;
			// do something
			setImmediate(function () {
				handleOnPage();
			});
		}
	});
	observer.observe(document, {
		attributes: true,
		childList: true,
		characterData: true,
		characterDataOldValue: true,
		subtree: true
	});
}());
