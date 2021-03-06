Ext.define('COO.view.organizationList.OrganizationList',{
	extend: 'Ext.grid.Panel',
	alias: 'widget.organizationList',
	itemId: 'organization-list-gridpanel',
	forceFit: true,
	selType: 'rowmodel',
	hideHeaders: true,
	stateful: true,
	collapsible: false,
	multiSelect: false,
	hidden: true,
	columnLines: false,
	style: 'margin-top:43px',
	store: 'OrganizationStore',
	columns: {
		items: [
			{
				dataIndex: 'name',
				flex: 1
			}
		]
	},
	viewConfig: {
		enableTextSelection: true,
		emptyText: 'Организаций нет',
        deferEmptyText: false,
        loadingText: 'Загрузка данных...',
		stripeRows: false
	}
});