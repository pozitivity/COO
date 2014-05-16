Ext.define('COO.controller.WelcomePanel',{
	extend: 'Ext.app.Controller',
	
	views: [
		'welcomePanel.WelcomePanel'
	],
	
	init: function(application) {
		console.log('[OK] Init WelcomePanel controller');
		this.control({
			'button#close-welcome-panel-id': {
				click: this.onCloseWelcomePanel
			}
		})
	},
	
	onCloseWelcomePanel: function(button, e, options) {
		console.log('Button Ok, thanks pressed');
		var wrc = Ext.ComponentQuery.query('#welcome-panel-id')[0];
		wrc.removeAll();
		wrc.close();
		Ext.create('COO.view.Container');
	}
});