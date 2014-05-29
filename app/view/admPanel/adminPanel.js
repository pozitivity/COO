Ext.define('COO.view.admPanel.adminPanel',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.adminPanel',

	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	items: [
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
					flex: 2
				},
				/*{
					dataIndex: 'login',
					flex: 1,
					renderer: function(grid, rowIndex, colIndex) {
						var rec = this.getStore().geAt(rowIndex);
						console.log(rec.data.user.login);
					}
				},*/
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
			]
		}
	]
});