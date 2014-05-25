Ext.define('COO.view.regPanels.MyCompanies',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.myCompaniesPanel',

	requires: [
		'Ext.grid.column.Action'
	],
	layout: {
		type: 'vbox',
		align: 'stretch',
		//pack: 'center'
	},

	items: [
		{
			xtype: 'grid',
			width: 700,
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
							return 'Обуликована'
						} else {
							return 'Не опубликована'
						}
					}
				},
				{
					xtype: 'actioncolumn',
					itemId: 'action-column-edit-company-id',
					//flex: 1,
					align: 'center',
					items: [
						{
							icon: 'resources/icons/myCompanies/edit.png',
							tooltip: 'Редактировать',
							iconCls: 'size_icon',
						}
					]
				},
				{
					xtype: 'actioncolumn',
					//flex: 1,
					itemId: 'action-column-delete-company-id',
					align: 'center',
					items: [
						{
							icon: 'resources/icons/myCompanies/del.png',
							tooltip: 'Удалить',
							iconCls: 'size_icon',
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