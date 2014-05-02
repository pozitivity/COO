Ext.define('COO.controller.WelcomePanel',{
	extend: 'Ext.app.Controller',
	
	views: [
		'COO.view.welcomePanel.WelcomePanel'
	],
	
	init: function(application) {
		console.log('[OK] Init WelcomePanel controller');
		this.control({
			'button#ok-close': {
				click: this.onCloseWelcomePanel
			}
		})
	},
	
	onCloseWelcomePanel: function(button, e, options) {
		console.log('Button Ok, thanks pressed');
		Ext.ComponentQuery.query('#welcome-panel-id')[0].removeAll();
	}
});