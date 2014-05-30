Ext.define('COO.view.rubricList.RubricList',{
	extend: 'Ext.grid.Panel',
	requires: [
		'COO.view.rubricList.RubricListController'
	],
	controller: 'rubricListController',
	alias: 'widget.rubricList',
	itemId: 'rubric-list-gridpanel',
	cls: 'rubricgrid',
	forceFit: true,
    autoScroll: true,
	hideHeaders: true,
	stateful: true,
	selType: 'rowmodel',
	collapsible: false,
	multiSelect: false,
	store: 'RubricStore',
	columns: {
		items: [
			{
				dataIndex: 'name',
				flex:1
			}
		]
	},
	viewConfig:{
		enableTextSelection: true,
		//emptyText: 'Подрубрик нет',
        //deferEmptyText: false,
        loadingText: 'Загрузка данных...',
		//stripeRows: false
	},
	tbar: [
    {
		text: 'Back',
		scope: 'this',
		listeners: {
			click: 'onButtonBack'
		},
		scale: 'small'
	}]
});