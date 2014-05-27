Ext.define("COO.view.login.Login", {
    extend: 'Ext.window.Window',
    alias: 'widget.login',

    resizable:false,
    shadow: false,
    modal: true,
	autoShow: true,
	
	height: 300,
	width: 500,
	layout: {
		type: 'fit'
	},
	
	
	title: 'Авторизация',
	closeAction: 'hide',
	closable: true,
	
	items: [{
		xtype: 'form',
		itemId: 'login-form-id',
		frame: false,
		bodyPadding: 15,
		defaults: {
			xtype: 'textfield',
			anchor: '100%',
			labelWidth: 60,
			allowBlank: false,
			minLength: 3,
			msgTarget: 'under'
		},
			
		items: [{
			name: 'login',
			fieldLabel: 'Логин',
			maxLength: 30
		},
		{
			inputType: 'password',
			name: 'password',
			fieldLabel: 'Пароль',
			maxLength: 30
		}],
			
		dockedItems: [{
			xtype: 'toolbar',
			dock: 'bottom',
			items:[
			{
				xtype: 'tbfill'
			},
			{
				xtype: 'button',
				itemId: 'cancel-login',
				text: 'Отмена'
			},
			{
				xtype: 'button',
				itemId: 'submit-login',
				formBind: true,
				text: 'ОК'
			}]
		}]
	}]
});