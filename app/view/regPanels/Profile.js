Ext.define('COO.view.regPanels.Profile',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.profilePanel',

	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	margin: '100 0 0 0',

	width: 500,


	items: [
		{
			xtype: 'form',
			itemId: 'profile-user-form-id',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'textfield',
					name: 'password',
					fieldLabel: 'Пароль',
					padding: '10 10'
				},
				{
					xtype: 'textfield',
					name: 'email',
					padding: '10 10',
					fieldLabel: 'E-mail'
				},
				{
					xtype: 'combo',
					store: 'CityStore',
					itemId: 'profile-choose-city-id',
					fieldLabel: 'Город',
					padding: '10 10',
					editable: false,
					displayField: 'cityName',
				},
				{
					xtype: 'panel',
					layout: {
						type: 'hbox',
						pack: 'end',
						align: 'middle'
					},
					items: [
						{
							xtype: 'button',
							text: 'Сохранить',
							itemId: 'save-profile-form-id'
						}
					]
				}
			]
		}
	]
});