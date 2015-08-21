'use strict';
var util = require('util');
var getPath = require('object-path-get');
var setPath = require('object-path-set');
var rootKey = 'GES.by.skratchdot';

var getRoot = function () {
	try {
		var root = JSON.parse(window.localStorage.getItem(rootKey));
		if (!util.isObject(root)) {
			root = {};
		}
		return root;
	} catch (e) {
		return {};
	}
};

exports.get = function (key, defaultValue) {
	var root = getRoot();
	return getPath(root, key, defaultValue);
};

exports.set = function (key, value) {
	var root = getRoot();
	root = setPath(root, key, value);
	window.localStorage.setItem(rootKey, JSON.stringify(root));
};

exports.test = function () {
	var key = 'localStorageTest';
	var value = Date.now();
	exports.set(key, value);
	return value === exports.get(key, null);
};
