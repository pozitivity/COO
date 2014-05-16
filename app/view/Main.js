Ext.define("COO.view.Main", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mainpanel',

    requires: [
    	'COO.view.rubricList.RubricList'
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
			collapsible: true,
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
			flex: 5
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