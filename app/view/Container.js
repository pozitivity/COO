/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */					
Ext.define('COO.view.Container', {
    extend: 'Ext.container.Container',

	requires:[
		'COO.view.rubricList.RubricList',
		'COO.view.organizationList.OrganizationList',
		'COO.view.welcomePanel.WelcomePanel'
	],
	
    layout: {
        type: 'border'
    },

    items: [
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
		height: 130,
		items: [
			{
				html: '<div id = "logo"></div>'
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
	}]
});
