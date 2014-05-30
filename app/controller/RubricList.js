Ext.define('COO.controller.RubricList',{
	extend:'Ext.app.Controller',
	
	views:[
		'COO.view.rubricList.RubricList',
		'COO.view.Container',
		'COO.view.organizationList.OrganizationList'
	],
	
	refs: [
		{
			ref: 'rubricListGridpanel',
			selector: '#rubric-list-gridpanel'
		},
		{
			ref: 'organizationListGridPanel',
			selector: '#organization-list-gridpanel'
		}
	],
	
	init:function(application){
		console.log('[OK] Init RubricList controller');
		this.control({
			'#rubric-list-gridpanel':{
				itemclick:this.onItemClick
			}
		});
	},
	
	onItemClick:function(view, record, item, index, e){
		var rubricId = record.data.rubricId;
		var mainRubricId = record.data.mainRubricId;
		var cityId = Ext.util.Cookies.get('cityId');
		
		Ext.ComponentQuery.query('#field-back-rubricId')[0].getForm().setValues(record.data);
		if (rubricId <= 4) {
				this.getRubricListGridpanel().getStore().reload({
				params: {
					mainRubricId: rubricId
				}
			});
		} else {
			this.getOrganizationListGridPanel().show();
			this.getOrganizationListGridPanel().getStore().reload({
				params: {
					cityId: cityId,
					rubricId: rubricId
				}
			});
		}
	}
});