Ext.define('COO.controller.mainPanels.RegHeader', {
    extend: 'Ext.app.Controller',

    views: [
    	'COO.view.regPanels.RegHeader'
    ],
    requires: [
        'COO.view.Header',
        'COO.view.infoCompany.InfoCompany',
        'COO.view.organizationList.OrganizationList',
        'COO.view.rubricList.RubricList',
        'COO.view.regPanels.MyCompanies',
        'COO.view.Main',
        'COO.view.regPanels.Profile'
    ],
    refs: [
        {
            ref: 'myOrganizationGridPanelRef',
            selector: '#my-organization-list-gridpanel'
        },
        {
            ref: 'rubricListGridPanelRef',
            selector: '#rubric-list-gridpanel'
        },
        {
            ref: 'buttonProfileRef',
            selector: 'button#profile-id'
        },
        {
            ref: 'buttonMyCompaniesRef',
            selector: 'button#my-companies-id'
        },
        {
            ref: 'buttonLogoutRef',
            selector: 'button#button-logout-id'
        },
        {
            ref: 'regHeaderComboChooseCityRef',
            selector: '#regheader-combo-choose-city-id'
        },
        {
            ref: 'profileUserFormRef',
            selector: '#profile-user-form-id'
        },
        {
            ref: 'profileComboCityRef',
            selector: '#profile-choose-city-id'
        }
    ],
    splashscreen: {},
    init: function(application){
    	console.log('[OK] Init RegHeader controller');
    	this.control(
    		{
    			"button#button-logout-id": {
    				click: this.onButtonLogoutClick
    			},
    			"button#my-companies-id": {
    				click: this.onButtonMyCompaniesClick
    			},
    			"button#profile-id": {
    				click: this.onButtonProfileClick
    			},
                "#regheader-combo-choose-city-id": {
                    change: this.onChangeCityInRegHeader
                }
    		}
    	);
    },
    onButtonProfileClick: function(button, e, options) {
    	console.log('button profile was clicked');
        //this.setPressedToolbarButton(button);
        //if(Ext.ComponentQuery.query('#info-company-id')[0] != undefined){
          //  Ext.ComponentQuery.query('#organization-list-gridpanel')[0].hide();
            //Ext.ComponentQuery.query('#info-company-id')[0].destroy();
            this.getRubricListGridPanelRef().getStore().load();
        //}
        Ext.ComponentQuery.query('#organization-list-gridpanel')[0].hide();
        var wrc = Ext.ComponentQuery.query('#center-panel-id')[0];
        wrc.removeAll();
        wrc.add(Ext.widget('profilePanel'));
        this.loadProfileUser();
    }, 
    loadProfileUser: function() {
        var userId = Ext.util.Cookies.get('userId');
        Ext.Ajax.request({
            url: '/SFO/rest/user/byId',
            method: 'GET',
            params: {
                userId: userId
            },
            success: function(conn, response) {
                this.getProfileUserFormRef().getForm().setValues(Ext.decode(conn.responseText));
                var cityName = Ext.decode(conn.responseText).city.cityName;
                this.getProfileComboCityRef().setValue(cityName ,true);
            },
            scope: this
        });
    },
    onButtonMyCompaniesClick: function(button, e, options) {
    	console.log('button my companies was clicked');
        //this.setPressedToolbarButton(button);
        //console.log(Ext.ComponentQuery.query('#field-back-rubricId')[0].getForm().getValues().mainRubricId);
        //if(Ext.ComponentQuery.query('#info-company-id')[0] != undefined){
            //Ext.ComponentQuery.query('#organization-list-gridpanel')[0].hide();
            //Ext.ComponentQuery.query('#info-company-id')[0].destroy();
            this.getRubricListGridPanelRef().getStore().load();
        //}
        Ext.ComponentQuery.query('#organization-list-gridpanel')[0].hide();
        var wrc = Ext.ComponentQuery.query('#center-panel-id')[0];
        wrc.removeAll();
        wrc.add(Ext.widget('myCompaniesPanel'));
        //userId = Ext.ComponentQuery.query('#field-userId')[0].getForm().getValues();
        userId = Ext.util.Cookies.get('userId');
        console.log(userId);
        this.loadMyCompanies(userId);
    },
    loadMyCompanies: function(userId){
        this.getMyOrganizationGridPanelRef().getStore().load({
            params: {
                userId: userId
            }
        });
    },
    onButtonLogoutClick: function(button, e, options){
    	console.log('button logout was clicked');
        //this.setPressedToolbarButton(button);
    	Ext.Ajax.request({
    		method: 'POST',
    		url: '/SFO/rest/authentication/logout'
    	});
        Ext.util.Cookies.set('userId', 0);
        Ext.util.COOkies.set('isAuth', 0);
        //COO.util.service.destroyContainer();
        //debugger;
        COO.util.service.initApp();
    },
    setPressedToolbarButton: function(button) {
        var pressed_classname = "pressed-button";
        this.getButtonMyCompaniesRef().removeCls(pressed_classname);
        this.getButtonProfileRef().removeCls(pressed_classname);
        this.getButtonLogoutRef().removeCls(pressed_classname);
        button.addCls(pressed_classname);
    },
    onChangeCityInRegHeader: function(oldValue, newValue, eOpts){
        var cityId = Ext.ComponentQuery.query('#regheader-combo-choose-city-id')[0].displayTplData[0].cityId;
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
                    this.getRegHeaderComboChooseCityRef().setValue(cityName, true);
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
