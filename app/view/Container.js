/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */					
Ext.define('COO.view.Container', {
    extend: 'Ext.container.Viewport',

	requires:[
		'COO.view.Header',
		'COO.view.Main',
		'COO.view.Footer'
	],
	
    layout: {
        type: 'vbox'
    },

    items: [
        {
			flex: 1,
            xtype: 'headerpanel',
            itemId: 'header-panel-id'
        },
        {
        	flex: 6,
            xtype: 'mainpanel'
        },
        {
        	flex: 0.5,
        	//xtype: 'footerpanel'
        	xtype: 'panel',
        	layout: {
        		type: 'vbox',
        		align: 'center',
        		pack: 'center'
        	},
        	margin: '0 0 0 500',
        	items: [
        		{
        			xtype: 'footerpanel'
        		}
        	]

        } 
    ],
    renderTo: Ext.getBody()

    /*items: [
	{
		xtype:'panel',
		region:'east',
		items:[
			{
				xtype:'form',
				itemId:'field-back-rubricId',
				items:[
					{
						xtype:'hidden',
						name:'mainRubricId'
					}
				]
			}
		]
	},
	{
       xtype: 'panel',
       region: 'west',
		width: 300,
		//split: true,
		collapsible: true,
		//collapsed: true,
		layout: 'fit',
		items: [
            {
                xtype: 'rubricList'
            }
		]
    },{
		region: 'center',
		xtype: 'panel',
		layout: 'border',
		items:[
			{
				region: 'center',
				xtype: 'panel',
				itemId: 'panel-center-id',
				id: 'panel-center',
				items: [
					{
						xtype: 'welcomePanel'
					}
				]
			},
			{
				region: 'west',
				xtype: 'panel',
				width: 250,
				layout: 'fit',
				items: [
					{
						xtype: 'organizationList'
					}
				]
			}
		]
    },
	{
		region: 'north',
		xtype: 'panel',
        layout:{
            type: 'hbox',
            //align: 'stretch',
            // pack: 'stretch'
        },
		height: 130,
		items: [
			{
				html: '<div id = "logo"></div>'
			},
            {
                xtype: 'combo',
                displayField: 'cityName',
                store: 'CityStore',
                fieldLabel: 'Choose City: ',
                style: 'margin-top: 50px; margin-left: 50px;',
                itemId: 'combo-choose-city-id'
            }
		]
	},
	{
		region: 'south',
		xtype: 'panel',
		height: 60,
		items: [
			{
				
			}
		]
	}]*/
});
