Ext.define('COO.controller.mainPanels.EditCompany',{
	extend: 'Ext.app.Controller',
	views: [
		'COO.view.regPanels.EditCompany'
	],

	requires: [
		'COO.view.regPanels.MyCompanies'
	],

	refs: [
		{
			ref: 'editCompanyFormRef',
			selector: '#edit-company-form-id'
		},
		{
			ref: 'editComboChooseMainRubricRef',
			selector: '#edit-combo-choose-mainRubric-id'
		},
		{
			ref: 'editComboChooseSubRubricRef',
			selector: '#edit-combo-choose-subRubric-id'
		},
		{
			ref: 'editComboChooseCityRef',
			selector: '#edit-company-combo-choose-city-id'
		},
		{
			ref: 'editUploadLogoFormRef',
			selector: '#edit-upload-logo-form-id'
		},
		{
			ref: 'editFieldUploadLogoRef',
			selector: '#edit-field-upload-logo-id'
		},
		{
			ref: 'editImageUploadLogoRef',
			selector: '#edit-image-upload-logo-id'
		},
		{
			ref: 'myOrganizationListGridPanelRef',
			selector: '#my-organization-list-gridpanel'
		}
	],
	init: function(application) {
		console.log('[OK] Init EditCompany controller');
		this.control({
				"#save-edit-company-id": {
					click: this.onButtonEditCompanySaveClick
				},
				"#edit-combo-choose-mainRubric-id": {
					change: this.onChangeMainRubricInEdit,
					expand: this.loadMainRubricInEdit
				},
				"#edit-combo-choose-subRubric-id": {
					change: this.onChangeSubRubricInEdit,
					expand: this.loadSubRubricInEdit
				},
				"#edit-field-upload-logo-id": {
					change: this.previewEditLogoCompany
				}
			});
	},
	onButtonEditCompanySaveClick: function(button, e, options) {
		console.log('Button save edit company was clicked');
		values = {}

		values.organizationId = this.getEditCompanyFormRef().getForm().getValues().organizationId;
		values.address = this.getEditCompanyFormRef().getForm().getValues().address;
		values.website = this.getEditCompanyFormRef().getForm().getValues().website;
		values.postcode = this.getEditCompanyFormRef().getForm().getValues().postcode;
		values.phone = this.getEditCompanyFormRef().getForm().getValues().phone;
		values.name = this.getEditCompanyFormRef().getForm().getValues().name;
		/*Ext.Ajax.request({
			url: '/SFO/rest/rubric/byRubricName',
			method: 'GET',
			params: {
				name: this.getEditComboChooseSubRubricRef().displayTplData[0].name
			},
			success: function(conn, response) {
				values.rubricId = Ext.Number.from(Ext.decode(conn.responseText).rubricId, 0);
				console.log(values.rubricId);
			},
			scope: this
		});*/
		values.rubricName = this.getEditComboChooseSubRubricRef().displayTplData[0].name
		values.cityName = this.getEditComboChooseCityRef().displayTplData[0].cityName;
		console.log(this.getEditComboChooseCityRef());
		values.userId = Ext.util.Cookies.get('userId');
		var info = this.getEditCompanyFormRef().getForm().getValues().info;
		values.infoId = Ext.ComponentQuery.query('#hidden-info-id')[0].getValue();
		values.logoId = Ext.ComponentQuery.query('#hidden-logo-id')[0].getValue();
		//values.infoId = 15;
		console.log(info);
		console.log(values);

		Ext.Ajax.request({
			url: '/SFO/rest/info/updateInfo',
			method: 'PUT',
			params: {
				info: info,
				infoId: values.infoId
			},
			success: function(conn, response) {
				console.log('Update info successed');
			}
		});
		console.log(values);
		console.log(Ext.ComponentQuery.query('#edit-field-upload-logo-id')[0].getSubmitValue());
		if(Ext.ComponentQuery.query('#edit-field-upload-logo-id')[0].getSubmitValue() === "") {
			Ext.Ajax.request({
					url: '/SFO/rest/organization/updateOrganization',
					method: 'POST',
					params: {
						organizationId: values.organizationId,
						rubricName: values.rubricName,
						address: values.address,
						infoId: values.infoId,
						logoId: values.logoId,
						cityName: values.cityName,
						website: values.website,
						postcode: values.postcode,
						name: values.name,
						phone: values.phone
					},
					success: function(conn, response) {
						console.log('Success upload organization');
						this.updateMyCompaniesList();
						var win = Ext.WindowManager.getActive();
						if(win) { win.close(); }
					},
					scope: this
				});
		} else {
			this.getEditUploadLogoFormRef().getForm().submit({
				standartSubmit: false,
            	method:'POST',
            	url:'/SFO/rest/logo/upload',
            	headers:{
                	'Content-Type':'image/png',
                	'accept':'application/json'
            	},
            	waitMsg:'Организация обновляется...',
            	success:function(conn, response, options, eOpts){

            	},
            	failure:function(conn, response, options, eOpts){
                	console.log(response.response.responseText);
                	values.logoId = Ext.decode(response.response.responseText).logoId;

                	console.log(values);
					Ext.Ajax.request({
						url: '/SFO/rest/organization/updateOrganization',
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
		}
	},

	updateMyCompaniesList: function() {
		this.getMyOrganizationListGridPanelRef().getStore().load({
			params: {
				userId: Ext.util.Cookies.get('userId')
			}
		});
	},

	onChangeMainRubricInEdit: function(oldValue, newValue, eOpts) {
		this.getEditComboChooseSubRubricRef().setDisabled(false);
		this.getEditComboChooseSubRubricRef().setValue('',true);
		this.loadSubRubricInEdit();
	},
	onChangeSubRubricInEdit: function(oldValue, newValue, eOpts) {
		this.getEditComboChooseMainRubricRef().getStore().getProxy()._extraParams = { };
	},
	loadMainRubricInEdit: function(field, eOpts){
		this.getEditComboChooseMainRubricRef().getStore().getProxy()._extraParams = { };
		this.getEditComboChooseMainRubricRef().getStore().reload();
	},
	loadSubRubricInEdit: function(eOpts) {
		var name = Ext.ComponentQuery.query('#edit-combo-choose-mainRubric-id')[0].displayTplData[0].name;
		Ext.Ajax.request({
			url: '/SFO/rest/rubric/byRubricName',
			method: 'GET',
			params: {
				name: name
			},
			success: function(conn, response) {
				this.getEditComboChooseSubRubricRef().getStore().getProxy()._extraParams = { mainRubricId: Ext.decode(conn.responseText).mainRubricId };
			},
			scope: this
		});
		//this.getEditComboChooseSubRubricRef().getStore().getProxy()._extraParams = { mainRubricId: mainRubricId };
		this.getEditComboChooseSubRubricRef().getStore().reload();
	},
	previewEditLogoCompany: function(filefield, value, eOpts) {
		console.log('trying to set Logo at edit company window');
        var file = filefield.getEl().down('input[type=file]').dom.files[0]; // fibasic is fileuploadfield
        var reader = new FileReader();
        reader.onload = (function(theFile, canvas) {
            return function(e) {
                canvas.setSrc(e.target.result);
            };
        })(file, this.getEditImageUploadLogoRef());
        reader.readAsDataURL(file);
	}
});