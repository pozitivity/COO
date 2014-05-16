Ext.define("COO.view.Main", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mainpanel',

    requires: [
    	'COO.view.rubricList.RubricList',
    	'COO.view.organizationList.OrganizationList',
    	'COO.view.infoCompany.InfoCompany'
    ],

    layout: {
		type: 'hbox',
		align: 'stretch',
		pack: 'stretch'
	},

	items: [
		{
			xtype: 'panel',
			width: 300,
			flex: 1,
			//collapsible: true,
			layout: 'fit',
			items: [
				{
					xtype: 'rubricList',
					autoScroll: true
				}
			]
		},
		{
			xtype: 'panel',
			flex: 1,
			width: 300,
			//collapsible: true,
			layout: 'fit',
			items: [
				{
					xtype: 'organizationList',
					autoScroll: true
				}
			]
		},
		{
			xtype: 'panel',
			flex: 4,
			layout: 'fit',
			items: [
				{
					xtype: 'infoCompanyPanel'
				}
			]
		},
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
});