Ext.define('COO.view.regPanels.MyCompanies',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.myCompaniesPanel',

	items: [
		{
			xtype: 'grid',
			itemId: 'my-organization-list-gridpanel',
			forceFit: true,
			selType: 'rowmodel',
			hideHeaders: true,
			stateful: true,
			collapsible: false,
			multiSelect: false,
			columnLines: false,
			style: 'margin-top:43px',
			store: 'OrganizationStore',
			columns: [
				{
					dataIndex: 'name',
					flex: 2,
					//text: 'Имя'
				},
				{
					dataIndex: 'published',
					flex: 1,
					//text: 'Статус'
				},
				{
					xtype: 'actioncolumn',
					flex: 1,
					items: [
						{
							icon: 'resources/icons/myCompanies/edit.png'
							tooltip: 'Edit'
						}
					]
				},
				{
					xtype: 'actioncolumn',
					flex: 1,
					items: [
						{
							icon: 'resources/icons/myCompanies/delete.png'
							tooltip: 'Удалить'
						}
					]
				}
			]
		}
	]
});