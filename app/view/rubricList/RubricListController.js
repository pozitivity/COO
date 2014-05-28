Ext.define('COO.view.rubricList.RubricListController',{
	extend:'Ext.app.ViewController',
	
	alias:'controller.rubricListController',
	
	requires: [
		'COO.view.organizationList.OrganizationList',
		'COO.view.infoCompany.InfoCompany'
	],

	refs: [
		{
			ref: 'infoCompanyPanelRef',
			selector: '#info-company-id'
		},
		{
			ref: 'organizationListGridPanelRef',
			selector: '#organization-list-gridpanel'
		}
	],
	
	init:function(){
		console.log('[OK] Init ViewController RubricList');
	},
	
	onButtonBack:function(button, e, options){
		//if(Ext.ComponentQuery.query('#info-company-id')[0].destroy() != undefined){
		//	Ext.ComponentQuery.query('#info-company-id')[0].destroy();
		//}
		var wrc = Ext.ComponentQuery.query('#center-panel-id')[0];
		wrc.removeAll();
		Ext.ComponentQuery.query('#organization-list-gridpanel')[0].hide();
		this.getView().getStore().load();
	}
});