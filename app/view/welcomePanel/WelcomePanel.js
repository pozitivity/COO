Ext.define('COO.view.welcomePanel.WelcomePanel',{
	extend: 'Ext.window.Window',
	alias: 'widget.welcomePanel',
	
	itemId: 'welcome-panel-id',
	
	layout: {
		type: 'vbox',
		align: 'center',
		pack: 'stretch'
	},
	
	closable: false,
	border: true,
	modal: true,
	shadow: false,
	height:600,
	width: 1000,
	autoShow: true,
	defaults: {
		padding: 20
	},
	
	margin: '0 100 0 0',
	
	items: [
		{
			html: '<div style = "font-size: 40px;margin-top: 20px;">Welcome!</div>',
			height: 100
		},
		{
			xtype: 'combo',
            displayField: 'cityName',
            store: 'CityStore',
            fieldLabel: 'Choose City: ',
            style: 'margin-top: 50px; margin-left: 50px;',
            itemId: 'combo-choose-city-id'
		},
		{
			xtype: 'button',
			text: 'Ok, thanks',
			itemId: 'close-welcome-panel-id',
			//scale: 'small'
		}
	]
});