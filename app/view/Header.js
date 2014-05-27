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
			layout: {
				type: 'vbox',
				align: 'right'
			},
			items: [
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
							margin: '20 0 0 100',
							xtype: 'button',
							text: 'Войти',
							itemId: 'login-open-id',
							cls: 'toolbar'
						},
						{
							margin: '20 0 0 100',
							xtype: 'button',
							text: 'Регистрация',
							itemId: 'registration-open-id',
							cls: 'toolbar'
						}
					]
				},
				{
					xtype: 'combo',
            		displayField: 'cityName',
            		store: 'CityStore',
            		fieldLabel: 'Город',
            		style: 'margin-top: 10px; margin-left: 20px;',
            		itemId: 'header-combo-choose-city-id',
            		width: 300,
            		cls: 'combo_choose_city'
				}
			]
		}
	]
});