Ext.define('COO.view.infoCompany.InfoCompany',{
	extend: 'Ext.panel.Panel',

	alias: 'widget.infoCompanyPanel',

	//hidden: true,

	itemId: 'info-company-id',
	style: 'margin-top: 43px; margin-left: 30px;',
	items:[
    {
		xtype: 'form',
		layout: {
			type: 'vbox'
		},
		items: [{
			xtype: 'form',
			itemId: 'name-company-id',
			items: [{
			xtype: 'displayfield',
            name: 'name',
            cls: 'companyName'
        }]
		},
		{
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
            cls: 'logo_company'
		},
		{
			xtype: 'form',
            padding: '0 10 0 20',
            itemId: 'info-form-company-id',


			layout: {
				type: 'vbox'
			},

			defaults: {
                labelWidth: 90
            },

			items:[
				{
					xtype: 'hidden',
					name: 'id'
				},
                {
                    xtype: 'displayfield',
                    name: 'phone',
                    fieldLabel: 'Телефон',
                    margin: '0 0 0 20'
                },
                {
                    xtype: 'displayfield',
                    name: 'address',
                    width: 320,
                    autoScroll: true,
                    fieldLabel:'Адрес',
                    margin: '0 0 0 20'
                },
                {
                	xtype: 'displayfield',
                	name: 'postcode',
                	fieldLabel: 'Индекс',
                    margin: '30 0 0 20'
                },
                {
					xtype: 'displayfield',
					name: 'website',
                    itemId: 'manage-account-website-link-id',
                    margin: '0 0 0 20',
                    renderer: function(website) {
                        return '<a class="website" target="_blank" href="http://' + website + '">' + website + '</a>';
                    }
				},
			]
		}
        ]
    },
    {
    	xtype: 'form',
        width: 550,
        //height: 50,
        autoScroll: true,
    	itemId: 'add-info-company-id',
    	items: [
    		{
                margin: '30 0 0 0',
    			itemId: 'add-info-company-id',
    			html: '<div></div>',
                //width: 300,
                height: 80,
                autoScroll: true
    		}
    	]
    }]
	}
   ],

});