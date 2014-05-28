Ext.define('COO.view.admPanel.adminPanel',{
	extend: 'Ext..panel.Panel',
	alias: 'widget.adminPanel',

	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	items: [
		{
			xtype: 'grid',
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
					xtype: 'actioncolumn',
					itemId: 'action-column-edit-company-id',
					align: 'center',
					items: [
						{
							icon: 'resources/icons/myCompanies/edit.png',
							tooltip: 'Просмотр',
							iconCls: 'size_icon',
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
						}
					]
				}
			]
		}
	]
});