Ext.define('COO.view.welcomePanel.WelcomePanel',{
	extend: 'Ext.window.Window',
	alias: 'widget.welcomePanel',
	
	itemId: 'welcome-panel-id',
	
	layout: {
		type: 'border',
		align: 'center',
		//pack: 'stretch'
	},
	
	closable: false,
	border: true,
	modal: true,
	shadow: false,
	height:600,
	width: 1000,
	autoShow: true,
	
	margin: '0 100 0 0',
	
	items: [
		{
			region: 'north',
			xtype: 'panel',
			layout: {
				type: 'hbox',
				align: 'stretch',
				pack: 'center'
			},
			items: [
				{
					html: '<div style = "font-size: 40px;margin-top: 20px;text-align: center;">Добро пожаловать!</div>',
					height: 100
				}
			]
		},
		{
			region: 'center',
			flex: 5,
			xtype: 'panel',
			layout: {
				type: 'vbox',
				align: 'stretch',
				pack: 'stretch'
			},
			items: [
				{
					html: '<div style="text-align: center;">Здесь будет представлена небольшая инструкция по пользованию системой</div>'
				},
				{
					html: '<div style="text-align: center;">Для начала выберите город:</div>'
				},
				{
					xtype: 'combo',
            		displayField: 'cityName',
            		store: 'CityStore',
            		//fieldLabel: 'Выберите ваш город',
            		//style: 'margin-top: 50px; margin-left: 50px;',
            		itemId: 'combo-choose-city-id'
				}
			]
		},
		{
			xtype: 'panel',
			region: 'south',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'center'
			},
			items: [
				{
					xtype: 'button',
					text: 'Ok',
					itemId: 'close-welcome-panel-id',
					scale: 'small',
					disabled: true
				}
			]
		},
		{
			region: 'west',
			padding: 20,
			flex: 1,
			xtype: 'panel',
			layout: 'hbox',
			items: [
				{
					flex: 1,
					html: '<--'
				},
				{
					flex: 2,
					html: 'расположена таблица с рубриками, по которым фильтруются организации'
				}
			]
		},
		{
			region: 'east',
			flex: 1,
			padding: 20
		}
	]
});