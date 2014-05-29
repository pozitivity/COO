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
			}
		});
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
				Ext.ComponentQuery.query('#adm-organization-list-gridpanel')[0].getStore().load();
				//this.sendMail();
			}
		});
	},
	sendMail:  function(email) {
		var subject_published = "Организация опубликована";
        var body_published = 'Вы успешно прошли регистрацию на сайте coo.com! '+
            ' Ваш логин: ' + login + '  Ваш пароль: ' + password + '  Ваш E-mail: ' + email + 
            '  Ваш город: ' + cityName;
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