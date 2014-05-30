Ext.define('COO.view.admPanel.viewPanel',{
	extend: 'Ext.window.Window',

	alias: 'widget.admView',
	resizable: true,
	shadow: false,
	modal: true,
	closable: true,

	autoscroll: true,

	width: 700,
	minHeight: 450,
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	defaults: {
		padding: 40
	},

	title: 'Просмотр организации',
	items: [
		{
			xtype: 'form',
			layout: {
				type: 'vbox'
			},
			items: [{
				xtype: 'form',
				itemId: 'view-name-company-id',
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
					itemId: 'view-logo-company-id',
            		height: 300,
            		width: 300,
            		cls: 'logo_company'
				},
				{
					xtype: 'form',
            		padding: '0 10 0 20',
            		itemId: 'view-info-form-company-id',

					layout: {
						type: 'vbox'
					},

					defaults: {
                		labelWidth: 90
            		},

					items:[
					{
						xtype: 'hidden',
						name: 'organizationId'
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
                    	fieldLabel:'Адрес',
                    	width: 320,
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
					}]
				}
        	]
    	},
    	{
    		xtype: 'form',
    		itemId: 'add-info-company-id',
    		items: [
    			{
                	margin: '30 0 0 0',
    				itemId: 'view-add-info-company-id',
    				html: '<div></div>'
    			}
    		]
    	}]
	},
	{
		xtype: 'panel',
		layout: {
			type: 'hbox',
			align: 'middle',
			pack: 'center'
		},
		items: [
			{
				xtype: 'button',
				text: 'Удалить',
				itemId: 'view-delete-company-id',
				margin: '0 50 0 0',
				style: 'background-color: red; border-color: red;'
			},
			{
				xtype: 'button',
				text: 'Опубликовать',
				itemId: 'view-published-company-id',
				margin: '0 0 0 50',
				style: 'background-color: #157fcc; border-color: #157fcc;'
			}
		]
	}]
});