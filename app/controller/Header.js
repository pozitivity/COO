Ext.define('COO.controller.Header',{
	extend: 'Ext.app.Controller',
	views: [
		'COO.view.Header',
		'COO.view.login.Login',
		'COO.view.registration.RegistrationForm',
		'COO.view.organizationList.OrganizationList',
		'COO.view.Main'
	],

	refs: [
		{
			ref: 'buttonLoginRef',
			selector: 'button#login-open-id'
		},
		{
			ref: 'buttonRegistrationRef',
			selector: 'button#registration-open-id'
		}
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
		//this.setPressedToolbarButton(button);
		console.log('Button login was clicked');
		var config = {
			xtype: 'login'
		}
		var win = Ext.ComponentMgr.create(config);
        win.show();
       // Ext.ComponentQuery.query('#login-form-id')[0].getForm().reset();
	},
	onButtonRegistrationClick: function(button, e, options){
		//this.setPressedToolbarButton(button);
		console.log('Button registration was clicked');
		var config = {
			xtype: 'registration'
		}
		var win = Ext.ComponentMgr.create(config);
        win.show();
	},
	onChangeCityInHeader: function(newValue, oldValue, eOpts) {
		var cityId = Ext.ComponentQuery.query('#header-combo-choose-city-id')[0].displayTplData[0].cityId;
		Ext.util.Cookies.set('cityId', cityId);
        var wrc = Ext.ComponentQuery.query('#center-panel-id')[0];
        wrc.removeAll();
        Ext.ComponentQuery.query('#organization-list-gridpanel')[0].hide();
	},

	setPressedToolbarButton: function(button) {
		var pressed_classname = "pressed-button";
		this.getButtonLoginRef().removeCls(pressed_classname);
		this.getButtonRegistrationRef().removeCls(pressed_classname);
		button.addCls(pressed_classname);
	}
});