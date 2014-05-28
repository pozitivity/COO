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
	
	//margin: '0 100 0 0',
	
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
					height: 120
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
					height: 100,
					html: '<div style="text-align: center;font-size: 20px;">Здесь будет представлена небольшая инструкция по пользованию системой</div>'
				},
				{
					html: '<div style="text-align: center;font-size: 18px;">Для начала:</div>'
				},
				{
					xtype: 'combo',
            		displayField: 'cityName',
            		store: 'CityStore',
            		margin: '20 40 20 40',
            		itemId: 'combo-choose-city-id',
            		clearFilterOnBlur: true,
            		emptyText: 'Выберите город',
            		editable: false,
				}
			]
		},
		{
			xtype: 'panel',
			region: 'south',
			//padding: 20,
			//margin: 20,
			//margin: '100 0 0 0',
			layout: {
				type: 'vbox',
				align: 'middle',
				pack: 'center'
			},
			items: [
				{
					html: '<div style = "font-size: 16px; margin-bottom: 30px;">Нажмите ОК, чтобы перейти к системе</div>'
				},
				{
					xtype: 'button',
					text: 'Ok',
					itemId: 'close-welcome-panel-id',
					scale: 'small',
					disabled: true,
					style: 'margin-bottom: 30px;'
				}
			]
		},
		{
			region: 'west',
			//padding: 20,
			//margin: 20,
			flex: 2,
			xtype: 'panel',
			layout: 'hbox',
			items: [
				{
					flex: 1,
					html: '<div id = "arrow_left"></div>'
				},
				{
					flex: 2,
					html: 'Здесь находится таблица с рубриками, по которым фильтруются организации',
					style: 'margin-top: 90px; margin-left:10px;'
				}
			]
		},
		{
			region: 'east',
			flex: 2,
			//padding: 20,
			//margin: 20,
			xtype: 'panel',
			layout: 'vbox',
			items: [
				{
					flex: 4,
					html: '<div id = "arrow_alias"></div>'
				},
				{
					flex: 7,
					width: 170,
					html: '<div>В верхнем правом углу вы всегда можете поменять город</div><br/>'+
					'<div>Вы можете зарегистрироваться в нашей системе и получить возможность разместить компанию</div>',
					//style: 'margin-top: 90px; margin-right: 10px;'
				}
			]
		}
	]
});