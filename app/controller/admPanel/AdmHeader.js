Ext.define('COO.controller.admPanel.AdmHeader',{
	extend: 'Ext.app.Controller',

	views: [
		'COO.view.admPanel.AdmHeader'
	],

	requires: [
		'COO.view.admPanel.adminPanel',
		'COO.view.Main',
		'COO.view.admPanel.viewPanel'
	],
	refs: [
		{
			ref: 'admHeaderComboChooseCityRef',
			selector: '#admheader-combo-choose-city-id'
		},
		{
			ref: 'admGridPanelRef',
			selector: '#adm-organization-list-gridpanel'
		},
		{
			ref: 'buttonDeleteCompanyRef',
			selector: '#view-delete-company-id'
		}
	],
	init: function(application) {
		console.log('[OK] Init AdmHeader controller');
		this.control({
			"#adm-button-logout-id": {
				click: this.onButtonAdmLogoutClick
			},
			"#no-published-company-id": {
				click: this.onButtonViewNonPublishedOrganization
			},
			"#admheader-combo-choose-city-id": {
				change: this.onChangeCityInAdmHeader
			},
			"button#view-delete-company-id": {
				click: this.onButtonViewDeleteCompanyClick
			},
			"button#view-published-company-id": {
				click: this.onButtonViewPublishedCompanyClick
			},
			"#adm-search-field-id": {
				change: this.onSearchFieldCompanyInAdm
			}
		});
	},
	onSearchFieldCompanyInAdm: function(textfield, newValue, oldValue, eOpts) {
		console.log('SearchTextCompanyFieldChange ' + newValue);
        var me = this;
        var searchValue = newValue;
        var SearchRegExp = new RegExp('^'+searchValue, 'igm');

        var companyList = me.getAdmGridPanelRef();
        companyList.view.refresh();

        this.clearCompanySearchFilter();

        companyList.store.filter('name',SearchRegExp);
        companyList.getSelectionModel().select(0);

        textfield.focus();
	},
	clearCompanySearchFilter: function(){
		this.getAdmGridPanelRef().store.clearFilter();
	},
	onButtonViewPublishedCompanyClick: function(button, e, options) {
		console.log('Button published was clicked');
		var organizationId = Ext.ComponentQuery.query('#view-info-form-company-id')[0].getForm().getValues().organizationId;
		console.log(organizationId);
		Ext.Ajax.request({
			url: '/SFO/rest/organization/changePublished',
			method: 'GET',
			params: {
				organizationId: organizationId
			},
			success: function(conn, response) {
				console.log('Change published success');
				console.log(conn.responseText);
				Ext.Msg.show({
					title: 'Уведомление',
					msg: 'Организация опубликована',
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK
				});
				button.setDisabled(true);
				Ext.ComponentQuery.query('#adm-organization-list-gridpanel')[0].getStore().reload();
				var email = Ext.decode(conn.responseText).user.email;
				var name = Ext.decode(conn.responseText).name;
				console.log(email);
				var win = Ext.WindowManager.getActive();
				if(win) {win.close();}
				this.sendMail(email, name);
				this.getButtonDeleteCompanyRef().setDisabled(true);
			},
			scope: this
		});
	},
	sendMail:  function(email, name) {
		var subject_published = "Организация опубликована";
        var body_published = Ext.htmlDecode('Ваша организация ' + name + ' успешно опубликована на нашем сайте!');
            Ext.Ajax.request({
                url: '/SFO/rest/sendmail/sendMailReg',
                method: 'GET',
                params: {
                    to: email,
                    subject: subject_published,
                    text: body_published
                },
                success: function(conn, response) {
                    console.log('mail success send');
                }
            });
	},
	onButtonViewDeleteCompanyClick: function(button, e, options) {
		console.log('Button view delete was clicked');
		var organizationId = Ext.ComponentQuery.query('#view-info-form-company-id')[0].getForm().getValues().organizationId;
		Ext.Ajax.request({
			url: '/SFO/rest/organization/deleteOrganization',
			method: 'DELETE',
			params: {

				organizationId: organizationId
			},
			success: function(conn, response) {
				console.log('Organization success deleted');
				var win = Ext.WindowManager.getActive();
				if(win) {
					win.close();
				}
				Ext.ComponentQuery.query('#adm-organization-list-gridpanel')[0].getStore().reload();
			}
		});
	},
	onButtonAdmLogoutClick: function(button, e, options) {
		console.log('Button adm logout click');
		Ext.Ajax.request({
    		method: 'POST',
    		url: '/SFO/rest/authentication/logout'
    	});
    	var wrc = Ext.ComponentQuery.query('#center-panel-id')[0];
    	wrc.removeAll();
        Ext.util.Cookies.set('userId', 0);
        Ext.util.Cookies.set('isAuth', 0);
        COO.util.service.initApp();
	},
	onButtonViewNonPublishedOrganization: function(button, e, options) {
		console.log('Button NonPublishedCompany was clicked');
		var wrc = Ext.ComponentQuery.query('#center-panel-id')[0];
		wrc.removeAll();
		wrc.add(Ext.widget('adminPanel'));
		this.getAdmGridPanelRef().getStore().reload();
		Ext.ComponentQuery.query('#organization-list-gridpanel')[0].hide();
	},
	onChangeCityInAdmHeader: function(oldValue, newValue, eOpts) {
		var cityId = Ext.ComponentQuery.query('#admheader-combo-choose-city-id')[0].displayTplData[0].cityId;
        if(cityId === null || cityId === undefined || cityId === '') {
            cityId = Ext.util.Cookies.get('cityId');
            Ext.Ajax.request({
                url: '/SFO/rest/city/city',
                method: 'GET',
                params: {
                    cityId: cityId
                },
                success: function(conn, response){
                    var cityName = Ext.decode(conn.responseText).cityName;
                    this.getAdmHeaderComboChooseCityRef().setValue(cityName, true);
                },
                scope: this
            });
        }
        Ext.util.Cookies.set('cityId', cityId);
        var wrc = Ext.ComponentQuery.query('#center-panel-id')[0];
        wrc.removeAll();
        Ext.ComponentQuery.query('#organization-list-gridpanel')[0].hide();
	}

});