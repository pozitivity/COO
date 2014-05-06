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
			'#combo-choose-city-id': {
                change: this.onChangeCity
            }
		});
	},
	
	setActiveCenterRegion: function(name) {
		var wrc = Ext.getCmp('panel-center');
		wrc.removeAll();
		wrc.add(Ext.widget(name));
	},

    onChangeCity: function(newValue, oldValue, eOpts) {
        console.log(newValue.value + ' ' + newValue.valueModels[0].id);
    }
});
