Ext.define('COO.view.regPanels.MyCompanies',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.myCompaniesPanel',

	requires: [
		'Ext.grid.column.Action',
		//'COO.controller.mainPanels.MyCompanies'
	],
	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	autoScroll: true,
	//height: 400, 

	items: [
		{
			xtype: 'grid',
			autoScroll: true,
			width: 700,
			height: 400,
			itemId: 'my-organization-list-gridpanel',
			forceFit: true,
			selType: 'rowmodel',
			hideHeaders: true,
			stateful: true,
			collapsible: false,
			multiSelect: false,
			columnLines: false,
			title: 'Мои компании',
			style: 'margin-top:43px',
			store: 'MyOrganizationStore',
			columns: [
				{
					dataIndex: 'name',
					flex: 2
				},
				{
					dataIndex: 'published',
					flex: 2,
					renderer: function(value){
						if(value === 'true') {
							return 'Опубликована'
						} else {
							return 'Не опубликована'
						}
					}
				},
				{
					xtype: 'actioncolumn',
					itemId: 'action-column-edit-company-id',
					align: 'center',
					items: [
						{
							icon: 'resources/icons/myCompanies/edit.png',
							tooltip: 'Редактировать',
							iconCls: 'size_icon',
							handler: function(grid, rowIndex, colIndex) {
								COO.util.service.onIconMyCompaniesEditClick(grid, rowIndex, colIndex);
							}
						}
					]
				},
				{
					xtype: 'actioncolumn',
					itemId: 'action-column-delete-company-id',
					align: 'center',
					items: [
						{
							icon: 'resources/icons/myCompanies/del.png',
							tooltip: 'Удалить',
							iconCls: 'size_icon',
							handler:  function(grid, rowIndex, colIndex) {
								COO.util.service.onIconMyCompaniesDeleteClick(grid, rowIndex, colIndex);
							}
						}
					]
				}
			]
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
					text: 'Добавить новую компанию',
					itemId: 'button-add-new-company-id',
					margin: '50 0 0 0'
				}
			]
		}
	]
});