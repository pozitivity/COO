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
		},
		{
			ref: 'comboCityRef',
			selector: '#new-company-combo-choose-city-id'
		},
		{
			ref: 'newCompanyFormRef',
			selector: '#create-company-form-id'
		}
	],
	init: function(application){
		console.log('[OK] Init MyCompanies controller');
		this.control({
			"actioncolumn#action-column-edit-company-id": {
				click: this.onIconEditClick
			},
			"actioncolumn#action-column-delete-company-id": {
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
		this.getComboSubRubricRef().setValue('',true);
		this.loadSubRubric();
	},
	onChangeSubRubric: function(oldValue, newValue, eOpts) {
		this.getComboMainRubricRef().getStore().getProxy()._extraParams = { };
	},
	loadMainRubric: function(field, eOpts){
		this.getComboMainRubricRef().getStore().getProxy()._extraParams = { };
		this.getComboMainRubricRef().getStore().reload();
	},
	loadSubRubric: function(eOpts) {
		var mainRubricId = Ext.ComponentQuery.query('#combo-choose-mainRubric-id')[0].displayTplData[0].rubricId;
		this.getComboSubRubricRef().getStore().getProxy()._extraParams = { mainRubricId: mainRubricId };
		this.getComboSubRubricRef().getStore().reload();
	},
	onChangeCityInNewCompany: function(oldValue, newValue, eOpts) {

	},
	onButtonSaveNewCompanyClick: function(button, e, options) {
		console.log('Button save new company was clicked');
		values = {}
		values.address = this.getNewCompanyFormRef().getForm().getValues().address;
		values.website = this.getNewCompanyFormRef().getForm().getValues().website;
		values.postcode = this.getNewCompanyFormRef().getForm().getValues().postcode;
		values.phone = this.getNewCompanyFormRef().getForm().getValues().phone;
		values.name = this.getNewCompanyFormRef().getForm().getValues().name;
		values.rubricId = this.getComboSubRubricRef().displayTplData[0].rubricId;
		values.cityId = this.getComboCityRef().displayTplData[0].cityId;
		values.userId = Ext.util.Cookies.get('userId');
		values.logoId = 9;
		console.log(Ext.ComponentQuery.query('#upload-logo-form-id')[0].getForm().getValues());
		var info = this.getNewCompanyFormRef().getForm().getValues().info;
		console.log(info);
		Ext.Ajax.request({
			url: '/SFO/rest/info/newInfo',
			method: 'POST',
			params: {
				info: info
			},
			success: function(conn, response) {
				//values.infoId = 8;
				values.infoId = Ext.decode(conn.responseText).infoId;
				console.log(values.infoId);
			}
		});
		
		/*Ext.Ajax.request({
			method: 'GET',
			url: '/SFO/rest/logo/upload',
			params: {
				logo: 
			},
		});*/
		console.log(values);
		Ext.Ajax.request({
			url: '/SFO/rest/organization/newOrganization',
			method: 'POST',
			params: values,
			success: function(conn, response) {
				console.log('Success upload organization');
			}
		});
		var win = Ext.WindowManager.getActive();
		if(win) { win.close(); }
	}
});