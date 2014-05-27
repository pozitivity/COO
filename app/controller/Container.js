Ext.define('COO.controller.Container', {
    extend: 'Ext.app.Controller',
	
	views:[
		'Container',
	],
	
	requires: [
		'COO.view.welcomePanel.WelcomePanel',
		'COO.view.Header'
	],
	
	init:function(){
		console.log('[OK] Init controller Container');
	}
});
