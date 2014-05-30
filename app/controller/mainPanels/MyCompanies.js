Ext.define('COO.controller.mainPanels.MyCompanies',{
	extend: 'Ext.app.Controller',
	views: [
		'COO.view.regPanels.MyCompanies'
	],
	requires:[
		'COO.view.regPanels.NewCompany',
		'COO.view.regPanels.EditCompany'
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
		},
		{
			ref: 'imageUploadLogoRef',
			selector: '#image-upload-logo-id'
		},
		{
			ref: 'uploadLogoFormRef',
			selector: '#upload-logo-form-id'
		},
		{
			ref: 'myOrganizationListGridPanelRef',
			selector: '#my-organization-list-gridpanel'
		}
	],
	init: function(application){
		console.log('[OK] Init MyCompanies controller');
		this.control({
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
			},
			"#field-upload-logo-id": {
				change: this.previewLogoCompany
			}
		});
	},
	previewLogoCompany: function(filefield, value, eOpts) {
		console.log('trying to set Logo at edit company window');
        var file = filefield.getEl().down('input[type=file]').dom.files[0]; // fibasic is fileuploadfield
        var reader = new FileReader();
        reader.onload = (function(theFile, canvas) {
            return function(e) {
                canvas.setSrc(e.target.result);
            };
        })(file, this.getImageUploadLogoRef());
        reader.readAsDataURL(file);
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
		var info = this.getNewCompanyFormRef().getForm().getValues().info;
		//values.infoId = 15;
		console.log(info);
		Ext.Ajax.request({
			url: '/SFO/rest/info/newInfo',
			method: 'POST',
			params: {
				info: info
			},
			success: function(conn, response) {
				//values.infoId = 8;
				values.infoId = Ext.Number.from(Ext.decode(conn.responseText).infoId, 8);
				//console.log(values.infoId);
			}
		});
		
		this.getUploadLogoFormRef().getForm().submit({
			standartSubmit: false,
            method:'POST',
            url:'/SFO/rest/logo/upload',
            headers:{
                'Content-Type':'image/png',
                'accept':'application/json'
            },
            waitMsg:'Организация создается...',
            success:function(conn, response, options, eOpts){

            },
            failure:function(conn, response, options, eOpts){
                console.log(response.response.responseText);
                values.logoId = Ext.decode(response.response.responseText).logoId;

                console.log(values);
				Ext.Ajax.request({
					url: '/SFO/rest/organization/newOrganization',
					method: 'POST',
					params: values,
					success: function(conn, response) {
						console.log('Success upload organization');
						this.updateMyCompaniesList();
						var win = Ext.WindowManager.getActive();
						if(win) { win.close(); }
					},
					scope: this
				});
            },
            scope: this
        });
	},
	updateMyCompaniesList: function() {
		this.getMyOrganizationListGridPanelRef().getStore().load({
			params: {
				userId: Ext.util.Cookies.get('userId')
			}
		});
	}
});