Ext.define('COO.controller.mainPanels.MyCompanies',{
	extend: 'Ext.app.Controller',
	views: [
		'COO.view.regPanels.MyCompanies'
	],
	requires:[
		'COO.view.regPanels.NewCompany'
	],
	refs: [
		{
			ref: 'comboMainRubricRef',
			selector: '#combo-choose-mainRubric-id'
		},
		{
			ref: 'comboSubRubricRef',
			selector: '#combo-choose-subRubric-id'
		}
	],
	init: function(application){
		console.log('[OK] Init MyCompanies controller');
		this.control({
			"actioncolumn#action-column-edit-company-id[action=edit]": {
				click: this.onIconEditClick
			},
			"actioncolumn#action-column-delete-company-id[action=delete]": {
				click: this.onIconDeleteClick
			},
			"button#button-add-new-company-id": {
				click: this.onButtonAddNewCompanyClick
			},
			"#combo-choose-mainRubric-id": {
				change: this.onChangeMainRubric,
				expand: this.loadMainRubric
			},
			"#combo-choose-subRubric-id": {
				change: this.onChangeSubRubric,
				expand: this.loadSubRubric
			},
			"#new-company-combo-choose-city-id": {
				change: this.onChangeCityInNewCompany
			},
			"button#save-new-company-id": {
				click: this.onButtonSaveNewCompanyClick
			}
		});
	},
	onIconEditClick: function(grid, cell, row, col, e){
		console.log('icon edit click');
	},
	onIconDeleteClick: function(grid, cell, row, col, e){
		console.log('icon delete click');
	},
	onButtonAddNewCompanyClick: function(button, e, options){
		console.log('button add new company click');
		config = {
			xtype: 'newCompany',
		}
		var win = Ext.ComponentMgr.create(config);
		win.show();
	},
	onChangeMainRubric: function(oldValue, newValue, eOpts) {
		this.getComboSubRubricRef().setDisabled(false);
		this.loadSubRubric();
		/*var rubricId = Ext.ComponentQuery.query('#combo-choose-mainRubric-id')[0].displayTplData[0].rubricId;
		this.getComboSubRubricRef().getStore().load({
			params: {
				rubricId: rubricId
			}
		});*/
	},
	onChangeSubRubric: function(oldValue, newValue, eOpts) {
		this.getComboMainRubricRef().getStore().getProxy()._extraParams = { };
		//this.getComboMainRubricRef().getStore().rejectChanges();
	},
	loadMainRubric: function(field, eOpts){
		this.getComboMainRubricRef().getStore().getProxy()._extraParams = { };
		this.getComboMainRubricRef().getStore().reload();
	},
	loadSubRubric: function(eOpts) {
		var mainRubricId = Ext.ComponentQuery.query('#combo-choose-mainRubric-id')[0].displayTplData[0].rubricId;
		this.getComboSubRubricRef().getStore().getProxy()._extraParams = { mainRubricId: mainRubricId };
		this.getComboSubRubricRef().getStore().reload();
		//this.getComboSubRubricRef().getStore().rejectChanges();
		//this.getComboSubRubricRef().getStore().load();
	},
	onChangeCityInNewCompany: function(oldValue, newValue, eOpts) {

	},
	onButtonSaveNewCompanyClick: function(button, e, options) {
		console.log('button save new company was clicked');
		var win = Ext.WindowManager.getActive();
		if(win) { win.close(); }
	}
});