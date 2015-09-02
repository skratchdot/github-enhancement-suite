'use strict';
var jQuery = require('jquery');

exports.name = 'Repo Counts';
exports.description = 'A user script to display repo counts when browsing Github repository pages.';
exports.enabledSelector = 'body.page-profile .tabnav-tab.selected:contains("Repositories")';

exports.onPage = function () {
	// Make input filter smaller when the "new repo" button exists
	if (jQuery('body.page-profile .filter-bar a.new-repo').length > 0) {
        jQuery('#your-repos-filter').css('width', '180px');
	}
	jQuery('.page-profile ul.repo_filterer li a').each(function () {
		try {
			var elem = jQuery(this),
				selector = elem.data('filter'),
				elements = jQuery('ul.js-repo-list').find('li' + selector);
			elem.append(' (' + elements.size() + ')');
			elem.css('font-size', '11px');
		} catch (e) {}
	});
};
