'use strict';
var React = require('react');
var jQuery = require('jquery');
var plugins = require('../core/plugins');
var utils = require('../core/utils');
var packageInfo = require('../../package.json');
// config
var containerId = 'github-enhancement-suite-settings';
var appId = containerId + '-app';

exports.name = 'Settings';
exports.description = 'A plugin that controls all the Github Enhancement Suite plugin settings and whether or not a plugin is enabled.';
exports.enabledSelector = 'a.js-selected-navigation-item.selected[href="/settings/profile"]';

exports.onPage = function () {
	var App, PluginDisplay, injectContainer;

	injectContainer = function () {
		if (jQuery('#' + containerId).length === 0) {
			jQuery('.column.three-fourths').append('' +
				'<div id="' + containerId + '" class="boxed-group clearfix">' +
				'	<h3>Github Enhancement Suite</h3>' +
				'	<div id="' + appId + '" class="boxed-group-inner" style="padding-bottom:20px"></div>' +
				'</div>'
			);
		}
	};

	App = React.createClass({
		getDefaultProps: function () {
			return {
				pluginNames: plugins.pluginNames.filter(function (plugin) {
					return plugin !== 'settings';
				})
			};
		},
		getInitialState: function () {
			return {
				lastAction: Date.now()
			};
		},
		onEnableButton: function (pluginName) {
			utils.togglePluginEnabled(pluginName);
			this.setState({lastAction: Date.now()});
		},
		render: function () {
			var $this = this;
			return (
				<div>
					<h1>
						Settings
						&nbsp;
						<small style={{fontSize: 'small', color: '#333'}}>
							Github Enhancement Suite (version {packageInfo.version})
						</small>
					</h1>
					<hr />
					{this.props.pluginNames.map(function (pluginName) {
						var plugin = plugins[pluginName];
						return (
							<div>
								<PluginDisplay
									key={plugin.name}
									name={plugin.name}
									description={plugin.description}
									enabled={utils.isPluginEnabled(pluginName)}
									onEnableButton={$this.onEnableButton.bind($this, pluginName)}
								/>
								<hr />
							</div>
						);
					})}
				</div>
			);
		}
	});
	
	PluginDisplay = React.createClass({
		getDefaultProps: function () {
			return {
				name: '',
				description: '',
				enabled: false,
				onEnableButton: function () {}
			};
		},
		render: function () {
			return (
				<div style={{padding:20}}>
					<div>
						<div style={{float:'left',width:'80%'}}>
							<h4>{this.props.name}</h4>
							<br />
							<div style={{
								width: '100%',
								background: '#fafafa',
								border: '1px solid #eaeaea',
								padding: 20,
								borderRadius: 10
							}}>
								{this.props.description}
							</div>
						</div>
						<div style={{float:'right'}}>
							<button onClick={this.props.onEnableButton} className={'btn btn-' + (this.props.enabled === true ? 'primary' : 'danger')}>
								{this.props.enabled === true ? 'Enabled' : 'Disabled'}
							</button>
						</div>
					</div>
					<div style={{clear:'both',float:'none'}}>&nbsp;</div>
				</div>
			);
		}
	});
	
	// setup page
	injectContainer();
	React.render(<App />, document.getElementById(appId));
};
