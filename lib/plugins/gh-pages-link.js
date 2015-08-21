'use strict';
var jQuery = require('jquery');
var utils = require('../core/utils');

exports.enabledSelector = '.repo-container .repository-meta.js-details-container';

exports.onPage = function () {
	var data = utils.getCurrentAuthorAndRepo(),
		ghPageLink, ghPageSourceLink;
	if (data.author !== '' && data.repo !== '') {
		if (jQuery('[data-tab-filter="branches"] [data-name="gh-pages"]').length > 0) {
			ghPageLink = 'http://' + data.author + '.github.io/' + data.repo;
			ghPageSourceLink = 'https://github.com/' + data.author + '/' +
				data.repo + '/tree/gh-pages';
			if (jQuery('#skratchdot-gh-pages-container').length === 0) {
				jQuery(exports.enabledSelector).append('<div style="margin-top:5px" id="skratchdot-gh-pages-container">' +
					'<span style="padding-right:5px;"><b>gh-pages:</b></span>' +
					'<span><a id="skratchdot-gh-pages-link" href="#"></a></span>' +
					'<span>&nbsp;&#8226;&nbsp;</span>' +
					'<span><a id="skratchdot-gh-pages-link-source" href="#">[gh-pages source]</a></span>' +
					'</div>');
				// Fix html
				jQuery('#skratchdot-gh-pages-link').attr('href', ghPageLink).text(ghPageLink);
				jQuery('#skratchdot-gh-pages-link-source').attr('href', ghPageSourceLink);
			}
		} else {
			
		}

	}
};
