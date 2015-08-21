'use strict';
var jQuery = require('jquery');
var utils = require('../core/utils');

exports.enabledSelector = '.commit-ref:not(.editor-expander)';

exports.onPage = function () {
	jQuery(exports.enabledSelector).css('cursor', 'pointer').click(function () {
	    var repo = utils.getCurrentRepo(),
		    commitInfo = jQuery(this).text().trim().split(':');
	    console.log(repo, commitInfo);
		// When pull requests are coming from the same account, we need to make sure
	    // commitInfo[0] is the account, and commitInfo[1] is the branch name.
		if (commitInfo.length === 1) {
		    commitInfo = [utils.getCurrentAuthor(), commitInfo[0]];
		}
		if (repo.length > 0 && commitInfo.length === 2) {
		    document.location = '/' + commitInfo[0] + '/' + repo + '/tree/' + commitInfo[1];
		}
	});
};
