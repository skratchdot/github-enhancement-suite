'use strict';
var jQuery = require('jquery');
var url = require('url');

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
