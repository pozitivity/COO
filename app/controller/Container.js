Ext.define('COO.controller.Container', {
    extend: 'Ext.app.Controller',
	
	views:[
		'Container',
	],
	
	requires: [
		'COO.view.welcomePanel.WelcomePanel'
	],
	
	init:function(){
		console.log('[OK] Init controller Container');
		//this.setActiveCenterRegion('welcomePanel');
		this.control({
			
		});
	},
	
	setActiveCenterRegion: function(name) {
		var wrc = Ext.getCmp('panel-center');
		wrc.removeAll();
		wrc.add(Ext.widget(name));
	}
});
