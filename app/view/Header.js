Ext.define("COO.view.Header", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.headerpanel',

    requires: [
    	'COO.view.login.Login'
    ],
    layout: {
		type: 'hbox',
		pack: 'start',
		align: 'middle'
	},
	id: 'header-common-id',
	//width: 1024,
	items: [
		{
			html: '<div id = "logo"></div>'
		},
		{
			xtype: 'panel',
			minWidth: 1100,
			layout: {
				type: 'hbox',
				padding: '5px',
				pack: 'end',
				align: 'middle'
			},
			items: [
				{
					margin: '30 0 0 0',
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