'use strict';
var jQuery = require('jquery');

exports.name = 'Fork Count';
exports.description = 'Display repo counts (public, private, sources, forks, mirrors) on the profile page underneath a users followers/starred/following count';
exports.enabledSelector = 'body.page-profile .tabnav-tab.selected';

exports.onPage = function () {
	// Initial our variables (and jQuery selectors)
	var countRepos = 0,
		countPublic = 0,
		countPrivate = 0,
		countSources = 0,
		countForks = 0,
		countMirrors = 0,
		repoList = jQuery('ul.js-repo-list > li'),
		statsContainer = jQuery('.column.vcard:first .vcard-stats'),
		stats;

	// insert our container
	if (jQuery('#skratchdot-fork-count').length === 0) {
		statsContainer.append('<div class="clearfix"></div>');
		statsContainer.append('<div style="margin-top:-10px" id="skratchdot-fork-count"><span class="text-muted">repo counts visible on <a href="?tab=repositories">tab repositories</a></span></div>');
	}
	stats = jQuery('#skratchdot-fork-count');
	if (!stats.hasClass('stats-populated') && repoList.length > 0) {
		// Loop through all repos, looking for public forks
		repoList.each(function () {
			try {
				var elem = jQuery(this);
				countRepos = countRepos + 1;
				if (elem.hasClass('public')) {
					countPublic = countPublic + 1;
				}
				if (elem.hasClass('private')) {
					countPrivate = countPrivate + 1;
				}
				if (elem.hasClass('source')) {
					countSources = countSources + 1;
				}
				if (elem.hasClass('fork')) {
					countForks = countForks + 1;
				}
				if (elem.hasClass('mirror')) {
					countMirrors = countMirrors + 1;
				}
			} catch (e) {}
		});
		stats.html('<small class="text-muted">' + countPublic + ' public, ' +
			countPrivate + ' private, ' +
			countSources + ' sources, ' +
			countForks + ' forks</small>' +
			(countMirrors > 0 ? '<small style="margin:0" class="text-muted">' + countMirrors + ' mirrors</small>' : '')
		);
		stats.addClass('stats-populated');
	}
};
