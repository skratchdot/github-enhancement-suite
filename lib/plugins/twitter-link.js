'use strict';
var jQuery = require('jquery');
var utils = require('../core/utils');

exports.name = 'Twitter Link';
exports.description = 'Adds a link to Twitter on a user\'s profile page.';
exports.enabledSelector = 'body.page-profile';

exports.onPage = function () {
	var username, $link, twitterSection;
	if (jQuery('#skratchdot-twitter-section').length === 0) {
		username = utils.getCurrentAuthor();
		$link = jQuery('<a />')
			.attr('href', '//twitter.com/' + encodeURIComponent(username))
			.text('@' + username);
		twitterSection = '<li class="vcard-detail" id="skratchdot-twitter-section">' +
			'<span class="octicon">&#9443;</span>' +
			'<span id="skratchdot-twitter-link"></span>' +
			'</li>';
		jQuery('.column.vcard:first ul.vcard-details:first').append(twitterSection);
		jQuery('#skratchdot-twitter-link').append($link);
	}
};
