Ext.define('COO.controller.Header',{
	extend: 'Ext.app.Controller',
	views: [
		'COO.view.Header',
		'COO.view.login.Login',
		'COO.view.registration.RegistrationForm',
		'COO.view.organizationList.OrganizationList',
		'COO.view.Main'
	],
	init: function(){
		console.log('[OK] Init Header controller');
		this.control(
			{
				"button#login-open-id": {
					click: this.onButtonLoginClick
				},
				"button#registration-open-id": {
					click: this.onButtonRegistrationClick
				},
				"#header-combo-choose-city-id": {
					change: this.onChangeCityInHeader
				}
			}
		);
	},
	onButtonLoginClick: function(button, e, options){
		console.log('Button login was clicked');
		var config = {
			xtype: 'login'
		}
		var win = Ext.ComponentMgr.create(config);
        win.show();
	},
	onButtonRegistrationClick: function(button, e, options){
		console.log('Button registration was clicked');
		var config = {
			xtype: 'registration'
		}
		var win = Ext.ComponentMgr.create(config);
        win.show();
	},
	onChangeCityInHeader: function(newValue, oldValue, eOpts){
		Ext.ComponentQuery.query('#field-cityId')[0].getForm().setValues(Ext.ComponentQuery.query('#header-combo-choose-city-id')[0].displayTplData[0]);
        console.log(Ext.ComponentQuery.query('#field-cityId')[0].getForm().getValues());
        var wrc = Ext.ComponentQuery.query('#center-panel-id')[0];
        wrc.removeAll();
        Ext.ComponentQuery.query('#organization-list-gridpanel')[0].hide();
	}
});