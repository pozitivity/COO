Ext.define('COO.controller.OrganizationList',{
	extend: 'Ext.app.Controller',
	
	views: [
		'COO.view.organizationList.OrganizationList'
	],
	
	init: function(application){
		console.log('[OK] Init OrganizationList controller');
	}
});