Ext.define('COO.controller.WelcomePanel',{
	extend: 'Ext.app.Controller',
	
	views: [
		'welcomePanel.WelcomePanel'
	],

	requires: [
		'COO.view.Main',
	],
	
	init: function(application) {
		console.log('[OK] Init WelcomePanel controller');
		this.control({
			'button#close-welcome-panel-id': {
				click: this.onCloseWelcomePanel
			},
			'#combo-choose-city-id': {
				change: this.onCityChange
			}
		})
	},
	
	onCloseWelcomePanel: function(button, e, options) {
		console.log('Button Ok, thanks pressed');
		var wrc = Ext.ComponentQuery.query('#welcome-panel-id')[0];
		wrc.removeAll();
		wrc.close();
	},
	onCityChange: function(oldValue, newValue, eOpts){
		console.log(Ext.ComponentQuery.query('#combo-choose-city-id')[0].displayTplData[0]);
		Ext.ComponentQuery.query('#close-welcome-panel-id')[0].setDisabled(false);
		this.setComboCityfield();
	},

	setComboCityfield: function() {
		Ext.util.Cookies.set('cityId', Ext.ComponentQuery.query('#combo-choose-city-id')[0].displayTplData[0].cityId);
		var cityId = Ext.util.Cookies.get('cityId');
		Ext.Ajax.request({
			url: '/SFO/rest/city/city',
			method: 'GET',
			params: {
				cityId: cityId
			},
			success: function(conn, response){
				var cityName = Ext.decode(conn.responseText).cityName;
				Ext.ComponentQuery.query('#header-combo-choose-city-id')[0].setValue(cityName, true);
			}
		});
	}
});