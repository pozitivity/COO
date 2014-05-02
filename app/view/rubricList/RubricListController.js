Ext.define('COO.view.rubricList.RubricListController',{
	extend:'Ext.app.ViewController',
	
	alias:'controller.rubricListController',
	
	requires: [
		'COO.view.organizationList.OrganizationList'
	],
	
	init:function(){
		console.log('[OK] init ViewController RubricList');
	},
	
	onButtonBack:function(button, e, options){
		Ext.ComponentQuery.query('#organization-list-gridpanel')[0].hide();
		this.getView().getStore().load();
	}
});