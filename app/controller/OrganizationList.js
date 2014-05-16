Ext.define('COO.controller.OrganizationList',{
	extend: 'Ext.app.Controller',
	
	views: [
		'COO.view.organizationList.OrganizationList',
		'COO.view.infoCompany.InfoCompany'
	],
	

	refs: [
		{
			ref: 'infoCompanyPanelRef',
			selector: '#info-company-id'
		}
	],

	init: function(application){
		console.log('[OK] Init OrganizationList controller');
		this.control({
			"#organization-list-gridpanel": {
				itemclick: this.onChangeCompany
			}
		});
	},
	onChangeCompany: function(view, record, item, index, e){
		console.log(record.data);
		this.getInfoCompanyPanelRef().show();
	}
});