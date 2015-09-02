'use strict';
var jQuery = require('jquery');
var url = require('url');
var storage = require('./storage');

exports.getCurrentAuthorAndRepo = function () {
	var parts = (url.parse(document.location.toString()).pathname || '').split('/');
	return {
		author: parts[1] || '',
		repo: parts[2] || ''
	};
};

exports.getCurrentRepo = function () {
	return exports.getCurrentAuthorAndRepo().repo;
};

exports.getCurrentAuthor = function () {
	return exports.getCurrentAuthorAndRepo().author;
};

exports.isPluginEnabled = function (pluginName) {
	// plugins are enabled by default
	if (typeof storage.get('enabled.' + pluginName) !== 'boolean') {
		storage.set('enabled.' + pluginName, true);
	}
	return storage.get('enabled.' + pluginName, true);
};

exports.enablePlugin = function (pluginName, enabled) {
	storage.set('enabled.' + pluginName, enabled);
};

exports.togglePluginEnabled = function (pluginName) {
	exports.enablePlugin(pluginName, !exports.isPluginEnabled(pluginName));
};

