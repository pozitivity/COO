Ext.define('COO.view.infoCompany.InfoCompany',{
	extend: 'Ext.panel.Panel',

	alias: 'widget.infoCompanyPanel',

	hidden: true,

	itemId: 'info-company-id',

	items:[
    {
		xtype: 'form',

		layout: {
			type: 'hbox',
			pack: 'stretch'
		},
		
		items:[
        {
			xtype: 'image',
			name: 'logo',
			itemId: 'logo-company-id',
            height: 300,
            width: 300,
            cls: 'logo-company'
		},
		{
			xtype: 'form',
            padding: '0 20 0 20',
            itemId: 'info-form-company-id',

			layout: {
				type: 'vbox'
			},

			defaults: {
                labelWidth: 100
            },

			items:[
				{
					xtype: 'hidden',
					name: 'id'
				},
				{
                    xtype: 'displayfield',
                    name: 'name',
                    fieldLabel: 'Имя'
                },
				{
					xtype: 'displayfield',
					name: 'website',
                    itemId: 'manage-account-website-link-id',
                    renderer: function(website) {
                        return '<a class="website" target="_blank" href="http://' + website + '">' + website + '</a>';
                    }
				},
                {
                    xtype: 'displayfield',
                    name: 'phone',
                    fieldLabel: 'Телефон'
                },
                {
                    xtype: 'displayfield',
                    name: 'address',
                    fieldLabel:'Адрес'
                }
			]
		}
        ]
	}
   ],

});