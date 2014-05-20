Ext.define('COO.controller.Header',{
	extend: 'Ext.app.Controller',
	views: [
		'COO.view.Header',
		'COO.view.login.Login',
		'COO.view.registration.RegistrationForm'
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
	}
});