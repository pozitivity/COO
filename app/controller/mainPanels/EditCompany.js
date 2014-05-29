Ext.define('COO.controller.mainPanels.EditCompany',{
	extend: 'Ext.app.Controller',
	views: [
		'COO.view.regPanels.EditCompany'
	],
	refs: [
		{
			ref: 'editCompanyFormRef',
			selector: 'edit-company-form-id'
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
				"#edit-company-combo-choose-city-id": {
					change: this.onChangeCityInEdit
				},
				"#edit-field-upload-logo-id": {
					change: this.previewEditLogoCompany
				}
			});
	},
	onButtonEditCompanySaveClick: function(button, e, options) {
		console.log('Button save edit company was clicked');
		values = {}

		values.address = this.getEditCompanyFormRef().getForm().getValues().address;
		values.website = this.getEditCompanyFormRef().getForm().getValues().website;
		values.postcode = this.getEditCompanyFormRef().getForm().getValues().postcode;
		values.phone = this.getEditCompanyFormRef().getForm().getValues().phone;
		values.name = this.getEditCompanyFormRef().getForm().getValues().name;
		values.rubricId = this.getEditComboSubRubricRef().displayTplData[0].rubricId;
		values.cityId = this.getEditComboCityRef().displayTplData[0].cityId;
		values.userId = Ext.util.Cookies.get('userId');
		var info = this.getEditCompanyFormRef().getForm().getValues().info;
		//values.infoId = 15;
		console.log(info);

		/*Ext.Ajax.request({
			url: '/SFO/rest/info/updateInfo',
			method: 'PUT'
			params: {

			}
		});*/
	},
	onChangeMainRubricInEdit: function(oldValue, newValue, eOpts) {
		this.getEditComboSubRubricRef().setDisabled(false);
		this.getEditComboSubRubricRef().setValue('',true);
		this.loadSubRubricInEdit();
	},
	onChangeSubRubricInEdit: function(oldValue, newValue, eOpts) {
		this.getEditComboMainRubricRef().getStore().getProxy()._extraParams = { };
	},
	loadMainRubricInEdit: function(field, eOpts){
		this.getEditComboMainRubricRef().getStore().getProxy()._extraParams = { };
		this.getEditComboMainRubricRef().getStore().reload();
	},
	loadSubRubricInEdit: function(eOpts) {
		var mainRubricId = Ext.ComponentQuery.query('#edit-combo-choose-mainRubric-id')[0].displayTplData[0].rubricId;
		this.getEditComboSubRubricRef().getStore().getProxy()._extraParams = { mainRubricId: mainRubricId };
		this.getEditComboSubRubricRef().getStore().reload();
	},
	previewEditLogoCompany: function(filefield, value, eOpts) {
		console.log('trying to set Logo at edit company window');
        var file = filefield.getEl().down('input[type=file]').dom.files[0]; // fibasic is fileuploadfield
        var reader = new FileReader();
        reader.onload = (function(theFile, canvas) {
            return function(e) {
                canvas.setSrc(e.target.result);
            };
        })(file, this.getImageUploadLogoRef());
        reader.readAsDataURL(file);
	}
});