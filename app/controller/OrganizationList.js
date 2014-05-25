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
		},
		{
			ref: 'nameCompanyRef',
			selector: '#name-company-id'
		},
		{
			ref: 'addInfoCompanyHtmlRef',
			selector: '#add-info-company-id'
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
		var wrc = Ext.ComponentQuery.query('#center-panel-id')[0];
		wrc.removeAll();
		wrc.add(Ext.widget('infoCompanyPanel'));
		//this.getInfoCompanyPanelRef().show();
		this.getInfoCompanyFormRef().getForm().setValues(record.data);
		this.getNameCompanyRef().getForm().setValues(record.data);
		this.getAddInfoCompanyHtmlRef().update(record.data.info.info);

		/*Ext.Ajax.request({
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
		});*/
	}
});