Ext.define('COO.view.regPanels.RegHeader',{
	extend: 'Ext.panel.Panel',

	alias: 'widget.regHeader',


	layout: {
		type: 'hbox',
		pack: 'start',
		align: 'middle'
	},
	items: [
		{
			html: '<div id = "logo"></div>'
		},
		/*{
			xtype: 'combo',
            displayField: 'cityName',
            store: 'CityStore',
            fieldLabel: 'Город',
            style: 'margin-top: 50px; margin-left: 20px;',
            itemId: 'regheader-combo-choose-city-id'
		},*/
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
						xtype: 'button',
						text: 'Мои компании',
						margin: '20 0 0 100',
						cls: 'toolbar',
						itemId: 'my-companies-id'
					},
					{
						xtype: 'button',
						text: 'Профиль',
						margin: '20 0 0 100',
						cls: 'toolbar',
						itemId: 'profile-id'
					},
					{
						xtype: 'button',
						text: 'Выйти',
						margin: '20 0 0 100',
						itemId: 'button-logout-id',
						cls: 'toolbar'
					}
				]
			},
			{
				xtype: 'combo',
            	displayField: 'cityName',
            	store: 'CityStore',
            	fieldLabel: 'Город',
            	width: 385,
            	style: 'margin-top: 10px; margin-left: 20px;',
            	itemId: 'regheader-combo-choose-city-id',
            	cls: 'combo_choose_city'
			}
			]
		}
	]
});