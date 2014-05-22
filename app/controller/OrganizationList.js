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
		},
		{
			ref: 'infoCompanyFormRef',
			selector: '#info-form-company-id'
		},
		{
			ref: 'logoCompanyRef',
			selector: '#logo-company-id'
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
		this.getInfoCompanyFormRef().getForm().setValues(record.data);
		Ext.Ajax.request({
			method: 'GET',
			params: {
				logoId: record.data.logo.logoId
			},
			url: '/SFO/rest/logo/findById',
			success: function(conn, response){
				console.log(Ext.decode(conn.responseText));
				this.getLogoCompanyRef().setSrc(Ext.decode(conn.responseText).logo);
			},
			failure: function(){

			},
			scope: this
		});
	}
});