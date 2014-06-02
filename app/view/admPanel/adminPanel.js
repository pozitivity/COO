Ext.define('COO.view.admPanel.adminPanel',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.adminPanel',

	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	items: [
		{
			xtype: 'textfield',
			itemId: 'adm-search-field-id',
			emptyText: 'Поиск по организациям',
			margin: '40 0 0 0'
		},
		{
			xtype: 'grid',
			autoScroll: true,
			width: 700,
			height: 400,
			itemId: 'adm-organization-list-gridpanel',
			forceFit: true,
			selType: 'rowmodel',
			hideHeaders: true,
			stateful: true,
			collapsible: false,
			multiSelect: false,
			columnLines: false,
			title: 'Неопубликованные организации',
			style: 'margin-top:43px',
			store: 'AdmOrganizationStore',
			columns: [
				{
					dataIndex: 'name',
					flex: 1
				},
				{
					dataIndex: 'user',
					flex: 1,
					renderer: function(val) {
						return val.login;
					}
				},
				{
					dataIndex: 'city',
					flex: 1,
					renderer: function(val) {
						return val.cityName;
					}
				},
				{
					xtype: 'actioncolumn',
					itemId: 'adm-view-company-id',
					align: 'center',
					items: [
						{
							icon: 'resources/icons/view.png',
							tooltip: 'Просмотр',
							iconCls: 'size_icon',
							handler: function(grid, rowIndex, colIndex) {
								COO.util.service.onIconAdminViewClick(grid, rowIndex, colIndex);
							}
						}
					]
				}
			],

			viewConfig: {
				enableTextSelection: true,
				emptyText: 'Неопубликованных компаний нет',
                deferEmptyText: false,
                loadingText: 'Загрузка данных...',
				stripeRows: false
			}
		}
	]
});