'use strict';
var jQuery = require('jquery');
var debounce = require('lodash.debounce');
var ay = require('../extras/ay-pie-chart').ay;
// config vars
var filterDiv;
var chartData;
var colors = [
	'#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c',
	'#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5'
];
// functions
var drawFilterDiv;
var injectCss;
var injectFilterDiv;
var repoFilterIsExpanded;
var repoFilterBuildChart;

exports.name = 'Repo Filter Info';
exports.description = 'A user script to display some additional info below the repository filter on a user\'s "repositories" page.';
exports.enabledSelector = 'body.page-profile .tabnav-tab.selected:contains("Repositories")';

exports.onPage = function () {
	var list = document.querySelector('.repo-tab .repo-list.js-repo-list');
	var observer = new MutationObserver(function (mutations) {
		//console.log(Date.now(), mutations.length);
		setImmediate(drawFilterDiv);
	});
	injectCss();
	injectFilterDiv();
	observer.observe(list, {
		attributes: true,
		childList: true,
		characterData: true,
		characterDataOldValue: true,
		subtree: true
	});
};

injectCss = function () {
	var i, colorNum, cssRule = '', id = 'skratchdot-repo-filter-info-css';
	if (jQuery('#' + id).length === 0) {
		// Create some styles
		cssRule += '<style type="text/css" id="' + id + '">';
		cssRule += '#skratchdot-repo-filter-div .show-hide { display: none; }';
		cssRule += '#skratchdot-repo-filter-div th, #skratchdot-repo-filter-div td { padding-right: 10px; }';
		cssRule += '#skratchdot-repo-filter-div .chart { width: 300px; height: 300px; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }';
		cssRule += '#skratchdot-repo-filter-div svg { width: 100%; height: 100%; }';
		cssRule += '#skratchdot-repo-filter-div .color-chip { border: 1px solid #000; width: 10px; height: 10px; }';
		for (i = 0; i < colors.length; i++) {
			colorNum = Math.min(colors.length, i + 1);
			cssRule += '#skratchdot-repo-filter-div path.g-' + colorNum + ' { fill:' + colors[i] + '; }';
			cssRule += '#skratchdot-repo-filter-div .color-g-' + colorNum + ' { background-color:' + colors[i] + '; }';
		}
		cssRule += '#skratchdot-repo-filter-div svg > g.label { text-anchor: middle; }';
		cssRule += '#skratchdot-repo-filter-div svg > g.labels g.label { -moz-pointer-events: none; -webkit-pointer-events: none; -o-pointer-events: none; pointer-events: none; }';
		cssRule += '#skratchdot-repo-filter-div svg > g.labels g.label rect { stroke: none; fill: #fff; fill-opacity: .5; shape-rendering: crispEdges; }';
		cssRule += '#skratchdot-repo-filter-div svg > g.labels g.label text { font-size: 12px; text-anchor: left; }';
		cssRule += '#skratchdot-repo-filter-div svg > g.labels g.label.active rect { fill-opacity: 1; }';
		cssRule += '</style>';
		jQuery('head').append(cssRule);
	}
};

injectFilterDiv = function () {
	if (jQuery('#skratchdot-repo-filter-div').length === 0) {
		// Create our information div
		jQuery('div.js-repo-filter .filter-bar').after(
			jQuery('<div></div>')
				.attr('id', 'skratchdot-repo-filter-div')
				.css('background', 'none repeat scroll 0 0 #FAFAFB')
				.css('border', '1px solid #DDDDDD')
				.css('border-radius', '4px 4px 4px 4px')
				.css('cursor', 'pointer')
				.css('margin-bottom', '10px')
				.css('padding', '10px')
				.css('text-align', 'center')
				.append('<div class="left" />')
				.append('<div class="right">' +
					'<a class="skratchdot-languages" href="#" style="font-size:.8em;padding:5px;">show languages</a>' +
					'<span class="octicon octicon-star"></span>' +
					'<span class="skratchdot-count-starred" style="padding:0px 5px;"></span>' +
					'&nbsp;<span class="octicon octicon-git-branch"></span>' +
					'<span class="skratchdot-count-forks" style="padding:0px 5px;"></span>' +
					'</div>')
				.append('<div class="show-hide" style="clear:both;">' +
					'<div style="float:left;">' +
					'<div class="chart"></div>' +
					'</div>' +
					'<div style="float:right;">' +
					'<table><thead><tr>' +
					'<th>Language</th>' +
					'<th>&nbsp;</th>' +
					'<th>Usage</th>' +
					'<th>Repos</th>' +
					'<th>Starred</th>' +
					'<th>Forks</th>' +
					'</tr></thead><tbody></tbody></table>' +
					'</div>' +
					'</div>')
				.append('<div class="clearfix" />')
		);
		filterDiv = jQuery('#skratchdot-repo-filter-div');
		// Attach a click event to show/hide language usage
		filterDiv.click(function (e) {
			e.preventDefault();
			if (repoFilterIsExpanded()) {
				filterDiv.find('.skratchdot-languages').text('show languages');
				filterDiv.find('.show-hide').hide();
			} else {
				filterDiv.find('.skratchdot-languages').text('hide languages');
				filterDiv.find('.show-hide').show();
				repoFilterBuildChart();
			}
		});
	}
};

repoFilterIsExpanded = function () {
	return filterDiv.find('.show-hide:visible').length > 0;
};

drawFilterDiv = debounce(function () {
	console.log('drawing filter div...');
	var i = 0, othersCount = 0,
		total = 0, forks = 0, starred = 0,
		languageHash = {}, languageArray = [], languageName = '', language = {},
		elements, elem, temp, forkCount, stargazerCount;

	// Initialize Chart Data
	chartData = [];

	// Calculate counts
	elements = document.querySelectorAll('ul.js-repo-list > li:not([style*="display: none"])');
	for (i = 0; i < elements.length; i++) {
		elem = jQuery('<div>' + elements[i].innerHTML + '</div>');
		// Do nothing if we are looking at an invalid <li />
		if (elem.find('.repo-list-stats').length === 0) {
			continue;
		}
		forkCount = parseInt(elem.find('[aria-label="Forks"]').text().replace(',', ''), 10);
		stargazerCount = parseInt(elem.find('[aria-label="Stargazers"]').text().replace(',', ''), 10);
		total = total + 1;
		forks += forkCount;
		starred += stargazerCount;
		// get language name
		temp = elem.find('.repo-list-stats').clone();
		temp.find('.repo-list-stat-item').remove();
		languageName = temp.text().trim();
		if (languageName === '') {
			languageName = 'Unknown';
		}
		if (!languageHash.hasOwnProperty(languageName)) {
			languageHash[languageName] = {
				name : languageName,
				count : 0,
				forks : 0,
				starred : 0
			};
		}
		languageHash[languageName].count = languageHash[languageName].count + 1;
		languageHash[languageName].forks = languageHash[languageName].forks + forkCount;
		languageHash[languageName].starred = languageHash[languageName].starred + stargazerCount;
	}

	// Display counts
	filterDiv.find('.left').html('Now Showing <b>' + total + '</b> Repos');
	filterDiv.find('.skratchdot-count-forks').text(forks);
	filterDiv.find('.skratchdot-count-starred').text(starred);
	filterDiv.find('table tbody').empty();
	filterDiv.find('.chart').empty();

	// Convert to array
	for (languageName in languageHash) {
		if (languageHash.hasOwnProperty(languageName)) {
			languageArray.push(languageHash[languageName]);
		}
	}

	// Sort Array
	languageArray.sort(function (a, b) {
		return b.count - a.count || a.name > b.name;
	});

	// Show languages
	for (i = 0; i < languageArray.length; i++) {
		language = languageArray[i];
		filterDiv.find('table tbody').append('<tr>' +
			'<td align="right">' + language.name + '</td>' +
			'<td align="center"><div class="color-chip color-g-' + Math.min(colors.length, i + 1) + '">&nbsp;</div></td>' +
			'<td align="center">' +
			((language.count / total) * 100).toFixed(2) + ' %' +
			'</td>' +
			'<td align="center">' + language.count + '</td>' +
			'<td align="center">' + language.starred + '</td>' +
			'<td align="center">' + language.forks + '</td>' +
			'</tr>');

		if (i < colors.length - 1) {
			chartData.push({
				index: i + 1,
				name: language.name,
				value: language.count
			});
		} else if (i !== 0) {
			othersCount += language.count;
		}
	}

	// Add "Others" to chartData
	if (othersCount > 0) {
		chartData.push({
			index: colors.length,
			name: 'Other',
			value: othersCount
		});
	}

	// Build Chart
	repoFilterBuildChart();
}, 100);

repoFilterBuildChart = function () {
	var $container = filterDiv.find('.chart');
	if (repoFilterIsExpanded() && $container.find('svg').length === 0) {
		$container.append('<svg class="skratchdot-language-chart"></svg>');
		if ('undefined' !== typeof ay) {
			ay.pie_chart('skratchdot-language-chart', chartData, { group_data: 0 });
		}
	}
};
