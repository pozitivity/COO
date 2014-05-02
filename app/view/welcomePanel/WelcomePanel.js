Ext.define('COO.view.welcomePanel.WelcomePanel',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.welcomePanel',
	
	itemId: 'welcome-panel-id',
	
	layout: {
		type: 'vbox',
		align: 'center',
		pack: 'stretch'
	},
	
	closable: true,
	border: true,
	
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
			xtype: 'panel',
			layout: {
				type: 'hbox',
				align: 'end',
				pack: 'end'
			},
			items: [
				{
					xtype: 'toolbar',
					items: [
						{
							xtype: 'button',
							text: 'Registration',
							scale: 'small'
						},
						{
							xtype: 'tbspacer',
							width: 50
						},
						{
							xtype: 'button',
							text: 'Ok, thanks',
							scale: 'small',
							listeners: {
								click: 'onCloseWindowClick'
							},
							itemId: 'ok-close'
						}
					]
				}
			]
		}
	]
});