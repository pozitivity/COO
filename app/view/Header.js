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
			xtype: 'combo',
            displayField: 'cityName',
            store: 'CityStore',
            fieldLabel: 'Город',
            style: 'margin-top: 50px; margin-left: 20px;',
            itemId: 'header-combo-choose-city-id'
		},
		{
			xtype: 'panel',
			minWidth: 750,
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
					itemId: 'login-open-id',
					cls: 'toolbar'
				},
				{
					margin: '30 0 0 50',
					xtype: 'button',
					text: 'Регистрация',
					itemId: 'registration-open-id',
					cls: 'toolbar'
				}
			]
		}
	]
});