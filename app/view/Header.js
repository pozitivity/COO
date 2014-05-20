Ext.define("COO.view.Header", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.headerpanel',

    requires: [
    	'COO.view.login.Login'
    ],
    layout: {
		type: 'hbox'
	},
	
	items: [
		{
			html: '<div id = "logo"></div>'
		},
		{
			xtype: 'panel',
			layout: {
				type: 'hbox',
			},
			items: [
				{
					margin: '30 0 0 1150',
					xtype: 'button',
					text: 'Войти',
					itemId: 'login-open-id'
				},
				{
					margin: '30 0 0 50',
					xtype: 'button',
					text: 'Зарегистрироваться',
					itemId: 'registration-open-id'
				}
			]
		}
	]
});