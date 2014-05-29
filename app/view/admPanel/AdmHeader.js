Ext.define('COO.view.admPanel.AdmHeader',{
	extend: 'Ext.panel.Panel',

	alias: 'widget.admHeader',


	layout: {
		type: 'hbox',
		pack: 'start',
		align: 'middle'
	},
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
						xtype: 'button',
						text: 'Неопубликованные компании',
						margin: '20 0 0 150',
						cls: 'toolbar',
						itemId: 'no-published-company-id'
					},
					{
						xtype: 'form',
						//itemId: 'form-login-user-id',
						width: 60,
						margin: '0 0 0 80',
						items: [
							{
								html: '<div style="align:right"></div>',
								itemId: 'form-login-user-id',
							}
						]

					},
					{
						xtype: 'button',
						text: 'Выйти',
						margin: '20 0 0 10',
						itemId: 'adm-button-logout-id',
						cls: 'toolbar'
					}
				]
			},
			{
				xtype: 'combo',
            	displayField: 'cityName',
            	store: 'CityStore',
            	//fieldLabel: 'Город',
            	width: 385,
            	style: 'margin-top: 10px; margin-left: 20px;',
            	itemId: 'admheader-combo-choose-city-id',
            	cls: 'combo_choose_city',
            	editable: false,
            	emptyText: 'Выберите город'
			}
			]
		}
	]
});