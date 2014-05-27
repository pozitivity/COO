Ext.define("COO.view.registration.RegistrationForm", {
    extend: 'Ext.window.Window',
    alias: 'widget.registration',

    resizable:false,
    shadow: false,
    modal: true,
	autoShow: true,
	
	height: 300,
	width: 500,
	layout: {
		type: 'fit'
	},
	
	
	title: 'Регистрация',
	closeAction: 'hide',
	closable: true,
	
	items: [{
		xtype: 'form',
		itemId: 'registration-form-id',
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
		},
		{
			name: 'email',
			fieldLabel: 'E-mail',
			maxLength: 50
		},
		{
			displayField: 'cityName',
			xtype: 'combo',
			store: 'CityStore',
			fieldLabel: 'Город',
			itemId: 'registration-choose-city-id'
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
				itemId: 'cancel-registration',
				text: 'Отмена'
			},
			{
				xtype: 'button',
				itemId: 'submit-registration',
				formBind: true,
				text: 'ОК'
			}]
		}]
	}]
});